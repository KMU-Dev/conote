import { Inject, Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { SENTRY_OPTIONS } from './constant';
import { SentryModuleOptions } from './sentry.interfaces';

@Injectable()
export class SentryService implements OnApplicationShutdown {
    private readonly logger = new Logger(SentryService.name);

    constructor(@Inject(SENTRY_OPTIONS) private readonly options: SentryModuleOptions) {
        Sentry.init(options.init);
    }

    async onApplicationShutdown() {
        if (this.options.init.shutdownTimeout) {
            this.logger.log(`Flushing Sentry with timeout ${this.options.init.shutdownTimeout} ms`);
            await Sentry.close(this.options.init.shutdownTimeout);
        }
    }
}
