import { AuthenticationError } from 'apollo-server-errors';

export class UnknownUserError extends AuthenticationError {
    private static readonly message = "Unknown user. Probably this is because we don't allow you to use our system.";

    constructor() {
        super(UnknownUserError.message, {
            response: {
                statusCode: 401,
                message: UnknownUserError.message,
            },
        });
    }
}
