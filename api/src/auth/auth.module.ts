import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GoogleModule } from '../google/google.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
    imports: [
        GoogleModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                publicKey: configService.get('jwt.publicKey'),
                privateKey: {
                    key: configService.get('jwt.privateKey'),
                    passphrase: configService.get('jwt.passphrase'),
                },
                signOptions: {
                    algorithm: 'RS256',
                    expiresIn: '2h',
                    issuer: configService.get('jwt.issuer'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthResolver, AuthService],
    exports: [AuthService],
})
export class AuthModule {}
