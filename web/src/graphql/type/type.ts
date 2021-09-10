export type GraphqlDto<K extends string, T> = {
    [key in K]: T & { __typename: string; };
};
