import { JwtPayload } from 'jsonwebtoken';

export interface GoogleIdToken extends JwtPayload {
    aud: string;
    exp: number;
    iat: number;
    iss: string;
    sub: string;
    at_hash?: string;
    azp?: string;
    email?: string;
    email_verified?: boolean;
    family_name?: string;
    given_name?: string;
    hd?: string;
    locale?: string;
    name?: string;
    nonce?: string;
    picture?: string;
    profile?: string;
}
