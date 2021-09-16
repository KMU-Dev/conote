import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Max, Min, ValidateIf } from 'class-validator';

@ArgsType()
export class ConnectionArgs {
    @ValidateIf((o) => !o.last)
    @Min(0)
    @Max(50)
    @IsInt()
    @Field(() => Int, { nullable: true })
    first?: number;

    @ValidateIf((o) => !o.first)
    @Min(0)
    @Max(50)
    @IsInt()
    @Field(() => Int, { nullable: true })
    last?: number;

    @IsOptional()
    @Field(() => String, { nullable: true })
    after?: string;

    @IsOptional()
    @Field(() => String, { nullable: true })
    before?: string;
}
