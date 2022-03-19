import { Inject, Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { SENTRY_OPTIONS } from './constant';

@Injectable()
export class SentryService implements OnApplicationShutdown {
    private readonly logger = new Logger(SentryService.name);

    constructor(@Inject(SENTRY_OPTIONS) private readonly options: Sentry.NodeOptions) {
        Sentry.init(options);
    }

    async onApplicationShutdown() {
        if (this.options.shutdownTimeout) {
            this.logger.log(`Flushing Sentry with timeout ${this.options.shutdownTimeout} ms`);
            await Sentry.close(this.options.shutdownTimeout);
        }
    }
}
