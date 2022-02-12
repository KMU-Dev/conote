import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import configuration from './config/configuration';
import { InitModule } from './init/init.module';
import { PrismaModule } from './prisma/prisma.module';
import { UiModule } from './ui/ui.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            buildSchemaOptions: {
                dateScalarMode: 'timestamp',
            },
            context: ({ req, res }) => ({ req, res }),
        }),
        PrismaModule,
        AuthModule,
        CaslModule,
        UserModule,
        InitModule,
        VideoModule,
        UiModule,
    ],
})
export class AppModule {}
