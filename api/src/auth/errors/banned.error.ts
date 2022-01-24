import { ApolloError } from 'apollo-server-errors';

export class BannedError extends ApolloError {
    constructor() {
        super('Your account is banned.', 'UNAUTHENTICATED', {
            response: {
                statusCode: 401,
                message: 'Your account is banned.',
            },
        });
    }
}
