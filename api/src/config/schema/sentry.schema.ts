import { NodeOptions } from '@sentry/node';
import { CaptureContext } from '@sentry/types';
import {
    IsBoolean,
    IsInt,
    IsObject,
    IsOptional,
    IsPositive,
    IsSemVer,
    IsString,
    IsUrl,
    Max,
    Min,
} from 'class-validator';

export class SentryConfig
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
