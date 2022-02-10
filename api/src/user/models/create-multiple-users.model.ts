import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, ValidateNested } from 'class-validator';
import { CreateUserInput } from './create-user.model';

@InputType()
export class CreateMultipleUsersInput {
    @IsArray()
    @ArrayMaxSize(1000)
    @ValidateNested({ each: true })
    @Type(() => CreateUserInput)
    items: CreateUserInput[];
}
