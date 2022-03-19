import { Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsNotEmpty, IsUrl, ValidateNested } from 'class-validator';

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
