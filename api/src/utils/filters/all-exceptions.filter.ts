import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { ExternalExceptionFilter } from '@nestjs/core/exceptions/external-exception-filter';
import { ApolloError } from 'apollo-server-errors';
import { InternalApolloError } from './errors/internal-apollo.error';

@Catch()
export class AllExceptionsFilter extends ExternalExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        try {
            if (!(exception instanceof ApolloError)) super.catch(exception, host);
        } catch (e) {}

        if (exception instanceof HttpException || exception instanceof ApolloError) return exception;
        return new InternalApolloError();
    }
}
