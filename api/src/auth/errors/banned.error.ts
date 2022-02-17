import { AuthenticationError } from 'apollo-server-errors';

export class BannedError extends AuthenticationError {
    constructor() {
        super('Your account is banned.', {
            response: {
                statusCode: 401,
                message: 'Your account is banned.',
            },
        });
    }
}
