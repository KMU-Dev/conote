import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class InitialGoogleLinkInput {
    @IsNotEmpty()
    @IsString()
    code: string;
}
