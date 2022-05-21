import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { ExternalExceptionFilter } from '@nestjs/core/exceptions/external-exception-filter';
import { ApolloError } from 'apollo-server-errors';
import { InternalApolloError } from './errors/internal-apollo.error';
import { PayloadTooLargeError } from './errors/payload-too-large.error';

@Catch()
export class AllExceptionsFilter extends ExternalExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        try {
            if (!(exception instanceof ApolloError)) super.catch(exception, host);
        } catch (e) {}

        if (exception instanceof HttpException || exception instanceof ApolloError) return exception;

        // handle PayloadTooLargeError
        if ((exception as Error).name === 'PayloadTooLargeError') return new PayloadTooLargeError();

        return new InternalApolloError();
    }
}
