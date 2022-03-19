import { Inject, NestMiddleware } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { SENTRY_OPTIONS } from './constant';
import { SentryModuleOptions } from './sentry.interfaces';

export class SentryRequestMiddleware implements NestMiddleware {
    constructor(@Inject(SENTRY_OPTIONS) private readonly options: SentryModuleOptions) {}

    use(req: any, res: any, next: (error?: any) => void) {
        const requestHandler = Sentry.Handlers.requestHandler(this.options.requestHandler);
        requestHandler(req, res, next);
    }
}
