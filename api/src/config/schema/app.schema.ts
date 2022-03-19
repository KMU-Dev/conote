import { Type } from 'class-transformer';
import { IsDefined, IsOptional, ValidateNested } from 'class-validator';
import { AuthConfig } from './auth.schema';
import { GraphQLConfig } from './graphql.schema';
import { OAuth2Config } from './oauth2.schema';
import { SentryConfig } from './sentry.schema';
import { VideoConfig } from './video.schema';

export class AppConfig {
    @ValidateNested()
    @IsDefined()
    @Type(() => OAuth2Config)
    oauth2: OAuth2Config;

    @ValidateNested()
    @IsDefined()
    @Type(() => AuthConfig)
    auth: AuthConfig;

    @ValidateNested()
    @IsOptional()
    @Type(() => GraphQLConfig)
    graphql?: GraphQLConfig;

    @ValidateNested()
    @IsOptional()
    @Type(() => SentryConfig)
    sentry?: SentryConfig;

    @ValidateNested()
    @IsDefined()
    @Type(() => VideoConfig)
    video: VideoConfig;
}
