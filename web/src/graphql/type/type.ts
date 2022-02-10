export type GraphqlDto<K extends string, T> = {
    [key in K]: T & { __typename: string; };
};

export interface ConnectionEdge<T> {
    node: T;
    cursor: string;
}

export interface PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
}

export interface Connection<T> {
    edges: ConnectionEdge<T>[];
    pageInfo: PageInfo;
    count: number;
}

export enum OrderDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

// Field should extends enum
export interface ConnectionOrder<Field extends string> {
    direction: OrderDirection;
    field: Field;
}

export interface ConnectionArgs<OrderField extends string> {
    first?: number;
    last?: number;
    after?: string;
    before?: string;
    query?: string;
    order?: ConnectionOrder<OrderField>;
}
