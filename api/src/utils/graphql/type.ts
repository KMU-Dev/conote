import { Request, Response } from 'express';

export interface GraphQLResponse extends Response {
    refreshToken?: string;
}

export interface GraphQLContext {
    req: Request;
    res: Response;
}
