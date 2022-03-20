import {
    DynamicModule,
    Inject,
    MiddlewareConsumer,
    Module,
    ModuleMetadata,
    NestModule,
    Provider,
} from '@nestjs/common';
import { ModuleAsyncOptions } from '../utils/module/module.intrefaces';
import { SENTRY_OPTIONS } from './constant';
import { SentryGraphQLInterceptor } from './sentry-graphql.interceptor';
import { SentryRequestMiddleware } from './sentry-request.middleware';
import { SentryTracingMiddleware } from './sentry-tracing.middleware';
import { SentryInterceptor } from './sentry.interceptor';
import { SentryModuleOptions } from './sentry.interfaces';
import { SentryService } from './sentry.service';

@Module({})
export class SentryModule implements NestModule {
    static forRoot(options?: SentryModuleOptions): DynamicModule {
        return {
            module: SentryModule,
            providers: [{ provide: SENTRY_OPTIONS, useValue: options }, ...this.buildStaticProviders()],
            exports: this.buildStaticExports(),
        };
    }

    static forRootAsync(options: ModuleAsyncOptions<SentryModuleOptions | void>): DynamicModule {
        return {
            module: SentryModule,
            imports: options.imports,
            providers: [
                {
                    provide: SENTRY_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
                ...this.buildStaticProviders(),
            ],
            exports: this.buildStaticExports(),
        };
    }

    constructor(@Inject(SENTRY_OPTIONS) private readonly options?: SentryModuleOptions) {}

    configure(consumer: MiddlewareConsumer) {
        if (this.options?.enabled) {
            // configure request handler if enabled
            consumer.apply(SentryRequestMiddleware).forRoutes('*');

            // configure tracing handler if tracing enabled
            if (this.options.tracing?.enabled) consumer.apply(SentryTracingMiddleware).forRoutes('*');
        }
    }

    private static buildStaticProviders(): Provider[] {
        return [
            SentryService,
            SentryInterceptor,
            SentryGraphQLInterceptor,
            SentryRequestMiddleware,
            SentryTracingMiddleware,
        ];
    }

    private static buildStaticExports(): ModuleMetadata['exports'] {
        return [SentryInterceptor, SentryGraphQLInterceptor];
    }
}
