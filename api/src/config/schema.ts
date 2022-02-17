import { Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';

export class GoogleOAuth2Config {
    @IsNotEmpty()
    @IsString()
    clientId: string;

    @IsNotEmpty()
    @IsString()
    clientSecret: string;

    @IsUrl({ require_tld: false })
    redirectUri: string;

    @IsOptional()
    @IsUrl({ require_tld: false })
    initialSetupRedirectUri: string;
}

export class OAuth2Config {
    @ValidateNested()
    @IsDefined()
    @Type(() => GoogleOAuth2Config)
    google: GoogleOAuth2Config;
}

export class JWTConfig {
    @IsNotEmpty()
    publicKey: string;

    @IsNotEmpty()
    privateKey: string;

    @IsNotEmpty()
    passphrase: string;

    @IsUrl()
    issuer: string;

    @IsNotEmpty()
    expiresIn: string;
}

export class RefreshTokenConfig {
    @IsNotEmpty()
    expiresIn: string;

    @IsBoolean()
    secure: boolean;
}

export class AuthConfig {
    @ValidateNested()
    @IsDefined()
    @Type(() => JWTConfig)
    jwt: JWTConfig;

    @ValidateNested()
    @IsDefined()
    @Type(() => RefreshTokenConfig)
    refreshToken: RefreshTokenConfig;
}

export class GraphQLUploadConfig {
    @IsOptional()
    @IsInt()
    maxFieldSize?: number;

    @IsOptional()
    @IsInt()
    maxFileSize?: number;

    @IsOptional()
    @IsInt()
    maxFiles?: number;
}

export class GraphQLConfig {
    @ValidateNested()
    @IsOptional()
    @Type(() => GraphQLUploadConfig)
    upload?: GraphQLUploadConfig;
}

export class VodcfsConfig {
    @IsNotEmpty()
    @IsString()
    account: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    folderId: string;
}

export class VideoConfig {
    @ValidateNested()
    @IsDefined()
    @Type(() => VodcfsConfig)
    vodcfs: VodcfsConfig;
}

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
    @IsDefined()
    @Type(() => VideoConfig)
    video: VideoConfig;
}
