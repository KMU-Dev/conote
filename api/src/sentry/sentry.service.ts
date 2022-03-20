import { Inject, Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import * as SentryIntegrations from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import * as SentryTracing from '@sentry/tracing';
import { SENTRY_OPTIONS } from './constant';
import { SentryModuleOptions } from './sentry.interfaces';

@Injectable()
export class SentryService implements OnApplicationShutdown {
    private readonly logger = new Logger(SentryService.name);

    constructor(@Inject(SENTRY_OPTIONS) private readonly options?: SentryModuleOptions) {
        if (options?.enabled) {
            if (options.init) {
                // rewrite frames to get sourcemap
                options.init.integrations = [
                    new SentryIntegrations.RewriteFrames({
                        root: global.__rootdir__,
                    }),
                ];

                // If tracing enabled, add http integrations
                if (options.tracing?.enabled) {
                    options.init.integrations = [
                        ...options.init.integrations,
                        new Sentry.Integrations.Http({ tracing: true }),
                        new SentryTracing.Integrations.Express(),
                    ];
                }
            }

            Sentry.init(options.init);
        }
    }

    async onApplicationShutdown() {
        if (this.options.init.shutdownTimeout) {
            this.logger.log(`Flushing Sentry with timeout ${this.options.init.shutdownTimeout} ms`);
            await Sentry.close(this.options.init.shutdownTimeout);
        }
    }
}
