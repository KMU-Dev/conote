import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuthProvider, Prisma } from '@prisma/client';
import { MalformedAuthCodeError } from '../google/errors/malformed-auth-code.error';
import { GoogleOAuth2Service } from '../google/oauth2.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthPayload } from './models/auth-payload.model';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly oauth2Service: GoogleOAuth2Service,
        private readonly jwtService: JwtService,
    ) {}

    async login(code: string) {
        try {
            const tokens = await this.oauth2Service.getToken(code);
            const idToken = this.oauth2Service.decodeIdToken(tokens);

            const user = await this.getUserByOAuth('Google', idToken.sub);

            if (user) {
                return {
                    accessToken: await this.jwtService.signAsync({ sub: user.id }),
                } as AuthPayload;
            }
        } catch (e) {
            if (!(e instanceof MalformedAuthCodeError)) this.logger.error(e);
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

    private async getUserByOAuth(provider: OAuthProvider, sub: string) {
        return await this.prisma.user.findFirst({
            where: {
                oauth: {
                    some: { provider, sub },
                },
            },
        });
    }
}
