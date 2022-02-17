import { ApolloError } from 'apollo-server-express';

export class InternalApolloError extends ApolloError {
    constructor() {
        super('Internal Server Error', 'INTERNAL_SERVER_ERROR', {
            response: {
                statusCode: 500,
                message: 'Internal Server Error',
                error: 'Internal Server Error',
            },
        });
    }
}
