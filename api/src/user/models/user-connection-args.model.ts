import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { ConnectionArgs } from '../../utils/graphql/connection/argument';

@ArgsType()
export class UserConnectionArgs extends ConnectionArgs {
    @IsOptional()
    @Field(() => String, { nullable: true })
    query?: string;
}
