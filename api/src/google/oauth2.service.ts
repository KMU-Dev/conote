import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client, Credentials } from 'google-auth-library';
import { google } from 'googleapis';
import { decode } from 'jsonwebtoken';
import { GaxiosError } from 'gaxios';
import { IdTokenNotFoundError, InvalidClaimError, MissingClaimError } from './errors/id-token.error';
import { GoogleUserEmailNotVarifiedError } from './errors/user.error';
import { GoogleIdToken } from './interfaces/id-token.interface';
import { OAuth2UserModel } from './models/oauth2-user.model';
import { MalformedAuthCodeError } from './errors/malformed-auth-code.error';

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
        try {
            const response = await this.oauth2Client.getToken(code);
            return response.tokens;
        } catch (e) {
            if (e instanceof GaxiosError && e.response) {
                const data = e.response.data;
                if (data.error && data.error === 'invalid_grant') throw new MalformedAuthCodeError(code);
            }
            throw e;
        }
    }

    decodeIdToken(tokens: Credentials) {
        if (!tokens.id_token) throw new IdTokenNotFoundError();
        return decode(tokens.id_token) as GoogleIdToken;
    }

    getOAuth2User(idToken: GoogleIdToken): OAuth2UserModel {
        const requiredClaims: (keyof typeof idToken)[] = ['hd', 'name', 'email', 'email_verified', 'picture'];
        for (const requiredClaim of requiredClaims) {
            if (typeof idToken[requiredClaim] === 'undefined') throw new MissingClaimError(String(idToken));
        }

        if (!idToken.email_verified) throw new GoogleUserEmailNotVarifiedError(idToken.email);

        // validate id token
        const iss = 'https://accounts.google.com';
        if (idToken.iss !== iss) throw new InvalidClaimError('iss', iss);
        const hd = 'gap.kmu.edu.tw';
        if (idToken.hd !== hd) throw new InvalidClaimError('hd', hd);
        if (idToken.exp * 1000 < Date.now()) throw new InvalidClaimError('exp', ` less than ${new Date()}`);

        return {
            name: idToken.name,
            email: idToken.email,
            studentId: idToken.email.split('@')[0],
            picture: idToken.picture,
        };
    }
}
