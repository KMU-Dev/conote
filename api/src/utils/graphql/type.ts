import { User } from '.prisma/client';
import { Request, Response } from 'express';

export interface GraphQLRequest extends Request {
    user?: User;
}

export interface GraphQLResponse extends Response {
    refreshToken?: string;
}

export interface GraphQLContext {
    req: GraphQLRequest;
    res: Response;
}
