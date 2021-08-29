import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { decode } from 'jsonwebtoken';
import { GoogleOAuth2Service } from '../google/oauth2.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private readonly prisma: PrismaService, private readonly oauth2Service: GoogleOAuth2Service) {}

    async login(code: string) {
        const token = await this.oauth2Service.getToken(code);
        const decoded = decode(token.id_token);
        this.logger.debug(decoded);
        this.logger.debug(token.expiry_date);
        return false;
    }

    async linkUser(userId: number, oauth: Prisma.OAuthCreateWithoutUserInput) {
        return await this.prisma.user.update({
            where: { id: userId },
            data: {
                oauth: {
                    create: oauth,
                },
            },
        });
    }
}
