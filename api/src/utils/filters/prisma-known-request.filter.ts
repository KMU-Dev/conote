import { Catch, ExceptionFilter } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaClientKnownRequestErrorMeta } from '../../prisma/type';
import { UniqueConstraintFailedError } from './errors/unique-constraint-failed.error';

@Catch(PrismaClientKnownRequestError)
export class PrismaKnonwRequestErrorFilter implements ExceptionFilter {
    catch(error: PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                return new UniqueConstraintFailedError(error.meta as PrismaClientKnownRequestErrorMeta);
            default:
                return error;
        }
    }
}
