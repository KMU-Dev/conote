import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { Observable, tap } from 'rxjs';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            tap({
                error: (error) => {
                    if (this.shouldReport(error)) {
                        Sentry.withScope((scope) => {
                            this.captureException(context, scope, error);
                        });
                    }
                },
            }),
        );
    }

    protected captureException(context: ExecutionContext, scope: Sentry.Scope, error: any) {
        // stub
    }

    private shouldReport(exception: any) {
        return true;
    }
}
