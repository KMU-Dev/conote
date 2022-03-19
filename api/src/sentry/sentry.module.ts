import { DynamicModule, Module } from '@nestjs/common';
import { NodeOptions } from '@sentry/node';
import { ModuleAsyncOptions } from '../utils/module/module.intrefaces';
import { SENTRY_OPTIONS } from './constant';
import { SentryService } from './sentry.service';

@Module({})
export class SentryModule {
    static forRoot(options: NodeOptions): DynamicModule {
        return {
            module: SentryModule,
            providers: [{ provide: SENTRY_OPTIONS, useValue: options }, SentryService],
        };
    }

    static forRootAsync(options: ModuleAsyncOptions<NodeOptions>): DynamicModule {
        return {
            module: SentryModule,
            imports: options.imports,
            providers: [
                {
                    provide: SENTRY_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
                SentryService,
            ],
        };
    }
}
