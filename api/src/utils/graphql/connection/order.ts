import { Type } from '@nestjs/common';
import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

export interface IOrderType<E> {
    direction: OrderDirection;
    field: E;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function Order<E extends object>(enumRef: E): Type<IOrderType<E>> {
    @InputType({ isAbstract: true })
    abstract class OrderType {
        @Field(() => OrderDirection)
        @IsEnum(OrderDirection)
        direction: OrderDirection;

        @Field(() => enumRef)
        @IsEnum(enumRef)
        field: E;
    }

    return OrderType as Type<IOrderType<E>>;
}

export enum OrderDirection {
    ASC = 'asc',
    DESC = 'desc',
}

registerEnumType(OrderDirection, { name: 'OrderDirection' });
