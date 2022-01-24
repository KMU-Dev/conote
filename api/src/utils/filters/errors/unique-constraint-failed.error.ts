import { ApolloError } from 'apollo-server-errors';
import { PrismaClientKnownRequestErrorMeta } from '../../../prisma/type';

export class UniqueConstraintFailedError extends ApolloError {
    constructor(meta: PrismaClientKnownRequestErrorMeta) {
        super('Unique constraint failed', 'CONFLICT', {
            response: {
                statusCode: 409,
                message: 'Unique constraint failed',
                error: 'Unique constraint failed',
                target: meta.target,
            },
        });
    }
}
