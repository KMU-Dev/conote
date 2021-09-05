import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';

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
}

export class AppConfig {
    @ValidateNested()
    @IsDefined()
    @Type(() => OAuth2Config)
    oauth2: OAuth2Config;

    @ValidateNested()
    @IsDefined()
    @Type(() => JWTConfig)
    jwt: JWTConfig;
}
