import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IConnectionType, IEdgeType, IPageInfoType } from './type';

export function Connection<T>(classRef: Type<T>, basename?: string): Type<IConnectionType<T>> {
    @ObjectType(`${basename || classRef.name}Edge`)
    abstract class EdgeType implements IEdgeType<T> {
        cursor: string;

        @Field(() => classRef)
        node: T;
    }

    @ObjectType('PageInfo')
    abstract class PageInfoType implements IPageInfoType {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
    }

    @ObjectType({ isAbstract: true })
    abstract class ConnectionType implements IConnectionType<T> {
        edges: EdgeType[];

        pageInfo: PageInfoType;

        @Field(() => Int)
        count: number;
    }

    return ConnectionType as Type<IConnectionType<T>>;
}
