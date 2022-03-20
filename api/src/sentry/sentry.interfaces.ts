import { Handlers, NodeOptions } from '@sentry/node';

export interface SentryModuleOptions {
    enabled?: boolean;
    init?: NodeOptions;
    requestHandler?: Handlers.RequestHandlerOptions;
}
