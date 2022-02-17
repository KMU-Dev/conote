import { Field, ID, InputType } from '@nestjs/graphql';
import { ArrayMaxSize, IsArray, IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteMultipleUsersInput {
    @Field(() => [ID])
    @IsArray()
    @ArrayMaxSize(1000)
    @IsNotEmpty({ each: true })
    ids: string[];
}
