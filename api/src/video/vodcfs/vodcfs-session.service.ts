import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VodcfsSession, VodcfsSessionErrorReason, VodcfsSessionStatus } from '@prisma/client';
import { load } from 'cheerio';
import { createHash } from 'crypto';
import FormData from 'form-data';
import { PrismaService } from '../../prisma/prisma.service';
import { cookieNameMap, pages } from './constants';
import InvalidAccountError from './errors/invalid-account.error';
import InvalidCaptchaError from './errors/invalid-captcha.error';
import UnknownPageError from './errors/unknown-page.error';

@Injectable()
export class VodcfsSessionService {
    private readonly axios: HttpService['axiosRef'];
    private readonly account: string;
    private readonly password: string;

    constructor(
        readonly httpService: HttpService,
        readonly configService: ConfigService,
        private readonly prisma: PrismaService,
    ) {
        this.axios = httpService.axiosRef;
        this.account = configService.get<string>('video.vodcfs.account');
        this.password = configService.get<string>('video.vodcfs.password');
    }

    async createSession(userId: number) {
        // create session
        const loginCookies = await this.getLoginPageCookies();
        let session = await this.prisma.vodcfsSession.create({
            data: {
                user: {
                    connect: { id: userId },
                },
                phpsessid: loginCookies.PHPSESSID,
                loginToken: loginCookies._login_token_,
            },
        });

        // get captcha
        const captcha = await this.getCaptcha(this.buildCookieFrom(session));
        const encodedCaptcha = this.encodeImage(captcha, 'image/jpeg');
        session = await this.prisma.vodcfsSession.update({
            where: { id: session.id },
            data: { captcha: encodedCaptcha },
        });

        return session;
    }

    async authenticateSession(sessionId: string, captchaAnswer: string) {
        let session = await this.prisma.vodcfsSession.findUnique({ where: { id: sessionId } });
        session = await this.prisma.vodcfsSession.update({
            where: { id: session.id },
            data: { timezone: 8, captchaAnswer },
        });

        // login
        try {
            const cookies = await this.login(session, captchaAnswer);
            session = await this.prisma.vodcfsSession.update({
                where: { id: session.id },
                data: {
                    noteFontSize: +cookies.noteFontSize,
                    noteExpand: +cookies.noteExpand,
                    status: VodcfsSessionStatus.AUTHENTICATED,
                },
            });
        } catch (e) {
            let reason: VodcfsSessionErrorReason;
            if (e instanceof InvalidAccountError) reason = VodcfsSessionErrorReason.INVALID_ACCOUNT;
            else if (e instanceof InvalidCaptchaError) reason = VodcfsSessionErrorReason.INVALID_CAPTCHA;
            else reason = VodcfsSessionErrorReason.UNKNOWN;

            session = await this.prisma.vodcfsSession.update({
                where: { id: session.id },
                data: { status: VodcfsSessionStatus.ERROR, errorReason: reason },
            });
        }

        return session;
    }

    async getSessionUser(sessionId: string) {
        const result = await this.prisma.vodcfsSession.findUnique({
            where: { id: sessionId },
            select: { user: true },
        });
        return result.user;
    }

    async findSessionById(id: string) {
        return await this.prisma.vodcfsSession.findUnique({ where: { id } });
    }

    buildCookieFrom(session: VodcfsSession) {
        const cookies: string[] = [];
        for (const key in cookieNameMap) {
            if (session[key] || session[key] === 0) cookies.push(`${cookieNameMap[key]}=${session[key]}`);
        }
        return cookies.join('; ');
    }

    private async getLoginPageCookies() {
        const loginRes = await this.axios.get(pages.login.url);
        const html = loginRes.data;
        if (!this.validate('login', html)) throw new UnknownPageError(html);
        return this.parseCookies(loginRes.headers['set-cookie']);
    }

    private async getCaptcha(cookie: string): Promise<Uint8Array> {
        const captchaRes = await this.axios.get(pages.captcha.url, {
            headers: { cookie },
            responseType: 'arraybuffer',
        });
        return captchaRes.data;
    }

    private async login(session: VodcfsSession, captchaAnswer: string) {
        const encodedPassword = this.md5(`${this.md5(this.md5(this.password))}|${session.loginToken}`);

        const formData = new FormData();
        formData.append('_fmSubmit', 'yes');
        formData.append('formVer', '3.0');
        formData.append('formId', 'login_form');
        formData.append('next', '/');
        formData.append('account', this.account);
        formData.append('password', encodedPassword);
        formData.append('captcha', captchaAnswer);
        formData.append('rememberMe', '');

        const response = await this.axios.post(pages.loginPost.url, formData, {
            headers: { ...formData.getHeaders(), ...{ cookie: this.buildCookieFrom(session) } },
        });

        if (!response.headers['set-cookie'] || response.headers['set-cookie'].length === 0) {
            // handle error
            const error = response.data.ret.msg[0];
            if (error.id === 'login_form') throw new InvalidAccountError();
            else if (error.id === 'captcha') throw new InvalidCaptchaError();
            else throw new Error('Unknown error');
        }

        return this.parseCookies(response.headers['set-cookie']);
    }

    private async validate(key: keyof typeof pages, html: string) {
        const title = pages[key].title;
        const $ = load(html);
        return $('title').text() === title;
    }

    private parseCookies(cookies?: string[]): Record<string, string> {
        if (!cookies) return {};
        return cookies.reduce((obj, cookie: string) => {
            const first = cookie.split(';')[0];
            const split = first.split('=');
            obj[split[0]] = split[1];
            return obj;
        }, {});
    }

    private encodeImage(image: Uint8Array, mimeType: string) {
        const base64 = Buffer.from(image).toString('base64');
        return `data:${mimeType};base64,${base64}`;
    }

    private md5(string: string) {
        return createHash('md5').update(string).digest('hex');
    }
}
