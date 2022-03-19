import { NodeOptions } from '@sentry/node';
import { CaptureContext } from '@sentry/types';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsDefined,
    IsIn,
    IsInt,
    IsObject,
    IsOptional,
    IsPositive,
    IsSemVer,
    IsString,
    IsUrl,
    Max,
    Min,
    ValidateIf,
    ValidateNested,
} from 'class-validator';

export class SentryInitConfig
    implements
        Omit<
            NodeOptions,
            | 'onFatalError'
            | 'frameContextLines'
            | 'defaultIntegrations'
            | 'integrations'
            | 'transport'
            | 'transportOptions'
            | '_metadata'
            | 'tracesSampler'
            | 'beforeSend'
            | 'beforeBreadcrumb'
        >
{
    @IsString()
    @IsOptional()
    dsn?: string;

    @IsBoolean()
    @IsOptional()
    debug?: boolean;

    @IsString()
    @IsSemVer()
    @IsOptional()
    release?: string;

    @IsString()
    @IsOptional()
    environment?: string;

    @IsUrl()
    @IsOptional()
    tunnel?: string;

    @Min(0)
    @Max(1)
    @IsOptional()
    sampleRate?: number;

    @IsInt()
    @Min(0)
    @Max(100)
    @IsOptional()
    maxBreadcrumbs?: number;

    @IsBoolean()
    @IsOptional()
    attachStacktrace?: boolean;

    @IsString()
    @IsOptional()
    serverName?: string;

    @IsBoolean()
    @IsOptional()
    autoSessionTracking?: boolean;

    @IsString()
    @IsOptional()
    caCerts?: string;

    @IsObject()
    @IsOptional()
    initialScope?: CaptureContext;

    @IsInt()
    @IsPositive()
    @IsOptional()
    maxValueLength?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    normalizeDepth?: number;

    @IsString()
    @IsOptional()
    httpProxy?: string;

    @IsString()
    @IsOptional()
    httpsProxy?: string;

    @IsInt()
    @Min(0)
    @IsOptional()
    shutdownTimeout?: number;

    @Min(0)
    @Max(1)
    @IsOptional()
    tracesSampleRate?: number;
}

export type TransactionNamingScheme = 'path' | 'methodPath' | 'handler';

export class SentryRequestHandlerConfig {
    @IsBoolean()
    @IsDefined()
    enabled: boolean;

    @IsBoolean()
    @IsOptional()
    ip?: boolean;

    @ValidateIf((_o, v) => typeof v !== 'boolean')
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    request?: boolean | string[];

    @IsBoolean()
    @IsOptional()
    serverName?: boolean;

    @ValidateIf((_o, v) => typeof v !== 'boolean')
    @IsIn(['path', 'methodPath', 'handler'])
    @IsOptional()
    transaction?: boolean | TransactionNamingScheme;

    @ValidateIf((_o, v) => typeof v !== 'boolean')
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    user?: boolean | string[];

    @IsBoolean()
    @IsOptional()
    version?: boolean;

    @IsInt()
    @Min(0)
    @IsOptional()
    flushTimeout?: number;
}

export class SentryConfig {
    @ValidateNested()
    @IsOptional()
    @Type(() => SentryInitConfig)
    init?: SentryInitConfig;

    @ValidateNested()
    @IsOptional()
    @Type(() => SentryRequestHandlerConfig)
    requestHandler?: SentryRequestHandlerConfig;
}
