import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { ConnectionArgs } from '../../utils/graphql/connection/argument';
import { UserOrder } from './user-order.model';

@ArgsType()
export class UserConnectionArgs extends ConnectionArgs {
    @IsOptional()
    @Field(() => String, { nullable: true })
    query?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => UserOrder)
    @Field(() => UserOrder, { nullable: true })
    order?: UserOrder;
}
