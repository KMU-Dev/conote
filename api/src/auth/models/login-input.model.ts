import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
    /**
     * Google OAuth2 authorization code
     */
    code: string;
}
