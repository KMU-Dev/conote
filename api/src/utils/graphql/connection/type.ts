export interface IEdgeType<T> {
    node: T;
    cursor: string;
}

export interface IPageInfoType {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    startCursor: string;
    endCursor: string;
}

export interface IConnectionType<T> {
    edges: IEdgeType<T>[];
    pageInfo: IPageInfoType;
    count: number;
}
