import { GraphQLErrorExtensions } from "graphql";

export interface BadUserInputExtensions extends GraphQLErrorExtensions {
    code: string;
    response: BadUserInputResponse
}

export interface BadUserInputResponse {
    error: string;
    message: string[];
    statusCode: number;
}
