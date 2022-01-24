import { ApolloError } from 'apollo-server-errors';
import { PrismaClientKnownRequestErrorMeta } from '../../../prisma/type';

export class NotFoundError extends ApolloError {
    constructor(meta: PrismaClientKnownRequestErrorMeta) {
        super('Not found', 'NOT_FOUND', {
            response: {
                statusCode: 404,
                message: meta.cause,
                error: 'Not found',
            },
        });
    }
}
