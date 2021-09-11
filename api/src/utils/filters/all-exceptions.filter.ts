import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { ExternalExceptionFilter } from '@nestjs/core/exceptions/external-exception-filter';
import { InternalApolloError } from './errors/internal-apollo.error';

@Catch()
export class AllExceptionsFilter extends ExternalExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        try {
            super.catch(exception, host);
        } catch (e) {}

        if (exception instanceof HttpException) return exception;
        return new InternalApolloError();
    }
}
