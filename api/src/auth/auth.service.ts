import { Injectable, Logger } from '@nestjs/common';
import { GoogleOAuth2Service } from '../google/oauth2.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private readonly oauth2Service: GoogleOAuth2Service) {}

    async login(code: string) {
        const token = await this.oauth2Service.getToken(code);
        this.logger.debug(token);
        return false;
    }
}
