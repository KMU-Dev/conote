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
