import { Handlers, NodeOptions } from '@sentry/node';

export interface SentryModuleRequestHandlerOptions extends Handlers.RequestHandlerOptions {
    enabled: boolean;
}

export interface SentryModuleOptions {
    init?: NodeOptions;
    requestHandler?: SentryModuleRequestHandlerOptions;
}
