import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import configuration from './config/configuration';
import { GraphQLUploadConfig } from './config/schema';
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
export class AppModule implements NestModule {
    constructor(private readonly configService: ConfigService) {}

    configure(consumer: MiddlewareConsumer) {
        const config = this.configService.get<GraphQLUploadConfig>('graphql.upload');
        consumer.apply(graphqlUploadExpress(config)).forRoutes('graphql');
    }
}
