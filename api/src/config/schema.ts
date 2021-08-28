import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';

export class GoogleOAuth2Config {
    @IsNotEmpty()
    @IsString()
    clientId: string;

    @IsNotEmpty()
    @IsString()
    clientSecret: string;

    @IsUrl({ require_tld: false })
    redirectUrl: string;
}

export class OAuth2Config {
    @ValidateNested()
    @IsDefined()
    @Type(() => GoogleOAuth2Config)
    google: GoogleOAuth2Config;
}

export class AppConfig {
    @ValidateNested()
    @IsDefined()
    @Type(() => OAuth2Config)
    oauth2: OAuth2Config;
}
