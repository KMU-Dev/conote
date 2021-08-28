import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    async login(code: string) {
        this.logger.debug(code);
        return false;
    }
}
