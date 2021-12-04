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
