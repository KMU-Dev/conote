import { Handlers, NodeOptions } from '@sentry/node';

export interface SentryModuleTracingOptions {
    enabled: boolean;
}

export interface SentryModuleOptions {
    enabled?: boolean;
    init?: NodeOptions;
    requestHandler?: Handlers.RequestHandlerOptions;
    tracing?: SentryModuleTracingOptions;
}
