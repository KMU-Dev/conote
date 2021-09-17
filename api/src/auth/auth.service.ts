import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OAuthProvider, Prisma, User } from '@prisma/client';
import ms from 'ms';
import { MalformedAuthCodeError } from '../google/errors/malformed-auth-code.error';
import { GoogleIdToken } from '../google/interfaces/id-token.interface';
import { GoogleOAuth2Service } from '../google/oauth2.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { GraphQLContext } from '../utils/graphql/type';
import { AuthPayload } from './models/auth-payload.model';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    private readonly refreshTokenExpiresIn: number;
    private readonly refreshTokenSecure: boolean;

    constructor(
        private readonly prisma: PrismaService,
        private readonly oauth2Service: GoogleOAuth2Service,
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        readonly configService: ConfigService,
    ) {
        this.refreshTokenExpiresIn = ms(configService.get<string>('auth.refreshToken.expiresIn'));
        this.refreshTokenSecure = configService.get('auth.refreshToken.secure');
    }

    async login(code: string, context: GraphQLContext) {
        try {
            const tokens = await this.oauth2Service.getToken(code);
            const idToken = this.oauth2Service.decodeIdToken(tokens);

            let user = await this.getUserByOAuth('Google', idToken.sub);

            if (!user) {
                // If user is in database, link user with OAuth provider
                if (idToken.email) {
                    const studentId = idToken.email.split('@')[0];
                    user = await this.userService.getUserByStudenId(studentId);
                    if (user) user = await this.firstOAuthLink(user, idToken);
                }
            }

            if (user) {
                // set refresh token cookie
                const refreshToken = await this.createRefreshToken(user.id, this.refreshTokenExpiresIn);
                context.res.cookie('rt', refreshToken.id, {
                    expires: refreshToken.expire,
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: this.refreshTokenSecure,
                });

                return await this.createAuthPayload(user.id);
            }
        } catch (e) {
            if (!(e instanceof MalformedAuthCodeError)) this.logger.error(e);
        }

        throw new UnauthorizedException();
    }

    async refreshToken(refreshToken?: string) {
        if (!refreshToken) throw new UnauthorizedException();

        const savedToken = await this.prisma.refreshToken.findFirst({
            where: { id: refreshToken },
        });

        if (savedToken && savedToken.valid && savedToken.expire.getTime() > Date.now()) {
            return await this.createAuthPayload(savedToken.userId);
        }
        throw new UnauthorizedException();
    }

    async linkUser(userId: number, oauth: Prisma.OAuthCreateWithoutUserInput) {
        return await this.prisma.user.update({
            where: { id: userId },
            data: {
                status: 'ACTIVE',
                oauth: {
                    create: oauth,
                },
            },
        });
    }

    async logout(refreshToken?: string) {
        if (!refreshToken) return false;
        try {
            await this.prisma.refreshToken.update({
                where: { id: refreshToken },
                data: { valid: false },
            });
            return true;
        } catch (e) {
            this.logger.error(e);
        }
        return false;
    }

    private async firstOAuthLink(user: User, idToken: GoogleIdToken) {
        const oAuth2User = this.oauth2Service.getOAuth2User(idToken);
        user = await this.userService.updateUser({ id: user.id, ...oAuth2User });
        return await this.linkUser(user.id, { provider: 'Google', sub: idToken.sub });
    }

    private async getUserByOAuth(provider: OAuthProvider, sub: string) {
        return await this.prisma.user.findFirst({
            where: {
                oauth: {
                    some: { provider, sub },
                },
            },
        });
    }

    private async createAuthPayload(userId: number) {
        return {
            accessToken: await this.jwtService.signAsync({ sub: userId }),
        } as AuthPayload;
    }

    private async createRefreshToken(userId: number, expiresIn: number) {
        return await this.prisma.refreshToken.create({
            data: {
                userId: userId,
                expire: new Date(Date.now() + expiresIn),
            },
        });
    }
}
