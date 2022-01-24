import { ApolloError } from 'apollo-server-errors';

export class UnknownUserError extends ApolloError {
    private static readonly message = "Unknown user. Probably this is because we don't allow you to use our system.";

    constructor() {
        super(UnknownUserError.message, 'UNAUTHENTICATED', {
            response: {
                statusCode: 401,
                message: UnknownUserError.message,
            },
        });
    }
}
