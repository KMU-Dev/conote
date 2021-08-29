import { Injectable, Logger } from '@nestjs/common';
import { OAuthProvider, Prisma } from '@prisma/client';
import { GoogleOAuth2Service } from '../google/oauth2.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private readonly prisma: PrismaService, private readonly oauth2Service: GoogleOAuth2Service) {}

    async login(code: string) {
        const tokens = await this.oauth2Service.getToken(code);
        const idToken = this.oauth2Service.decodeIdToken(tokens);

        const user = await this.getUserByOAuth('Google', idToken.sub);

        if (user) {
            console.log(user);
            return true;
        }

        return false;
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
