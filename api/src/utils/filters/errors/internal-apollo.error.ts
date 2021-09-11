import { ApolloError } from 'apollo-server-express';

export class InternalApolloError extends ApolloError {
    constructor() {
        super('Internal Server Error', undefined, {
            response: {
                statusCode: 500,
                message: 'Internal Server Error',
                error: 'Internal Server Error',
            },
        });
    }
}
