import { Injectable, Logger } from '@nestjs/common';
import { decode } from 'jsonwebtoken';
import { GoogleOAuth2Service } from '../google/oauth2.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private readonly oauth2Service: GoogleOAuth2Service) {}

    async login(code: string) {
        const token = await this.oauth2Service.getToken(code);
        const decoded = decode(token.id_token);
        this.logger.debug(decoded);
        this.logger.debug(token.expiry_date);
        return false;
    }
}
