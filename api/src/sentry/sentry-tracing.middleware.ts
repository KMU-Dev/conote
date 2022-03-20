import { Injectable, NestMiddleware } from '@nestjs/common';
import * as Sentry from '@sentry/node';

@Injectable()
export class SentryTracingMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        const tracingHandler = Sentry.Handlers.tracingHandler();
        tracingHandler(req, res, next);
    }
}
