import { ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class AuthPayload {
    @IsNotEmpty()
    accessToken: string;
}
