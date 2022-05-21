import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { isAutoSessionTrackingEnabled } from '@sentry/node/dist/sdk';
import { Scope, Span } from '@sentry/types';
import { ServerResponse } from 'http';
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

    protected shouldReport(error: any) {
        return !(error instanceof HttpException);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected captureException(context: ExecutionContext, scope: Sentry.Scope, error: any) {
        // stub
    }

    protected setBasicScope(scope: Scope, res: ServerResponse) {
        // For some reason we need to set the transaction on the scope again
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const transaction = (res as any).__sentry_transaction as Span;
        if (transaction && scope.getSpan() === undefined) {
            scope.setSpan(transaction);
        }

        const client = Sentry.getCurrentHub().getClient<Sentry.NodeClient>();
        if (client && isAutoSessionTrackingEnabled(client as any)) {
            // Check if the `SessionFlusher` is instantiated on the client to go into this branch that marks the
            // `requestSession.status` as `Crashed`, and this check is necessary because the `SessionFlusher` is only
            // instantiated when the the`requestHandler` middleware is initialised, which indicates that we should be
            // running in SessionAggregates mode
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const isSessionAggregatesMode = (client as any)._sessionFlusher !== undefined;
            if (isSessionAggregatesMode) {
                const requestSession = scope.getRequestSession();
                // If an error bubbles to the `errorHandler`, then this is an unhandled error, and should be reported as a
                // Crashed session. The `_requestSession.status` is checked to ensure that this error is happening within
                // the bounds of a request, and if so the status is updated
                if (requestSession && requestSession.status !== undefined) {
                    requestSession.status = 'crashed';
                }
            }
        }
    }
}
