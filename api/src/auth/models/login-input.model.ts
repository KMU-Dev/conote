import { InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
    /**
     * Google OAuth2 authorization code
     */
    @IsNotEmpty()
    code: string;
}
