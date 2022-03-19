import { Injectable, NestMiddleware } from '@nestjs/common';
import { Handlers } from '@sentry/node';

@Injectable()
export class SentryTracingMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        const tracingHandler = Handlers.tracingHandler();
        tracingHandler(req, res, next);
    }
}
