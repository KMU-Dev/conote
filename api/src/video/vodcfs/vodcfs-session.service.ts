import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VodcfsSession } from '@prisma/client';
import { load } from 'cheerio';
import { PrismaService } from '../../prisma/prisma.service';
import { cookieNameMap, pages } from './constants';
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

    async createVideoUploadSession(userId: number) {
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
        const captcha = await this.getCaptcha(this.buildCookies(session));
        const encodedCaptcha = this.encodeImage(captcha, 'image/jpeg');
        session = await this.prisma.vodcfsSession.update({
            where: { id: session.id },
            data: { captcha: encodedCaptcha },
        });
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

    private buildCookies(session: VodcfsSession) {
        const cookies: string[] = [];
        for (const key in cookieNameMap) {
            if (session[key]) cookies.push(`${cookieNameMap[key]}=${session[key]}`);
        }
        return cookies.join('; ');
    }

    private encodeImage(image: Uint8Array, mimeType: string) {
        const base64 = Buffer.from(image).toString('base64');
        return `data:${mimeType};base64,${base64}`;
    }
}
