import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateUserInput } from './create-user.model';

@InputType()
export class CreateMultipleUsersInput {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateUserInput)
    items: CreateUserInput[];
}
