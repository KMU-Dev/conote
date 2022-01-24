import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleModule } from '../google/google.module';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
    imports: [
        GoogleModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                publicKey: configService.get('auth.jwt.publicKey'),
                privateKey: {
                    key: configService.get('auth.jwt.privateKey'),
                    passphrase: configService.get('auth.jwt.passphrase'),
                },
                signOptions: {
                    algorithm: 'RS256',
                    expiresIn: configService.get('auth.jwt.expiresIn'),
                    issuer: configService.get('auth.jwt.issuer'),
                },
            }),
            inject: [ConfigService],
        }),
        PassportModule,
        UserModule,
    ],
    providers: [AuthResolver, AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
