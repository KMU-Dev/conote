import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { InitModule } from './init/init.module';
import { UiModule } from './ui/ui.module';
import configuration from './config/configuration';

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
        UserModule,
        InitModule,
        UiModule,
    ],
})
export class AppModule {}
