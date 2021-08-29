import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { GoogleOAuth2Service } from '../google/oauth2.service';
import { CreateUserInput } from '../user/models/create-user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class InitService {
    private sub: string;

    constructor(
        private readonly oauth2Service: GoogleOAuth2Service,
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    async getOAuth2User(code: string) {
        const tokens = await this.oauth2Service.getToken(code);
        const idToken = this.oauth2Service.decodeIdToken(tokens);
        const oauth2User = this.oauth2Service.getOAuth2User(idToken);
        this.sub = idToken.sub;
        return oauth2User;
    }

    async createAdminUser(input: CreateUserInput) {
        const user = await this.userService.createUser(input);
        return await this.authService.linkUser(user.id, { provider: 'Google', sub: this.sub });
    }
}
