import { ApolloError } from 'apollo-server-express';

export class PayloadTooLargeError extends ApolloError {
    constructor() {
        super('Payload too large', 'PAYLOAD_TOO_LARGE', {
            response: {
                statusCode: 413,
                message: 'Payload too large',
                error: 'Payload too large',
            },
        });
    }
}
