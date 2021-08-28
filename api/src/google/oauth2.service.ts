import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

@Injectable()
export class GoogleOAuth2Service {
    private readonly oauth2Client: OAuth2Client;

    constructor(private readonly configService: ConfigService) {
        this.oauth2Client = new google.auth.OAuth2({
            clientId: configService.get<string>('oauth2.google.clientId'),
            clientSecret: configService.get<string>('oauth2.google.clientSecret'),
            redirectUri: configService.get<string>('oauth2.google.redirectUri'),
        });
    }

    async getToken(code: string) {
        const response = await this.oauth2Client.getToken(code);
        return response.tokens;
    }
}
