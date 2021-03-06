import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import { graphqlUploadExpress } from 'graphql-upload';
import helmet from 'helmet';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import configuration from './config/configuration';
import { GraphQLUploadConfig } from './config/schema';
import { InitModule } from './init/init.module';
import { PrismaModule } from './prisma/prisma.module';
import { SentryModule } from './sentry/sentry.module';
import { UiModule } from './ui/ui.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        ServeStaticModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => [
                {
                    rootPath: join(__dirname, '..', 'client'),
                    exclude: configService.get('graphql.playground') ? ['/graphql'] : [],
                    serveStaticOptions: {
                        immutable: true,
                        maxAge: '7d',
                        setHeaders: (res, path) => {
                            if (path.endsWith('.html')) res.setHeader('Cache-Control', 'no-cache');
                        },
                    },
                },
            ],
        }),
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                debug: configService.get('graphql.debug'),
                playground: configService.get('graphql.playground'),
                autoSchemaFile: true,
                buildSchemaOptions: {
                    dateScalarMode: 'timestamp',
                },
                context: ({ req, res }) => ({ req, res }),
            }),
        }),
        SentryModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => configService.get('sentry'),
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
        // graphql-upload
        const graphqlUploadConfig = this.configService.get<GraphQLUploadConfig>('graphql.upload');
        consumer.apply(graphqlUploadExpress(graphqlUploadConfig)).forRoutes('graphql');

        // helmet
        const playgroundEnabled = this.configService.get<boolean>('graphql.playground');
        const excludes: RouteInfo[] = [];
        if (playgroundEnabled) excludes.push({ path: 'graphql', method: RequestMethod.GET });

        consumer
            .apply(
                helmet({
                    contentSecurityPolicy: {
                        directives: {
                            connectSrc: ["'self'", 'https://www.google-analytics.com'],
                            imgSrc: ["'self'", 'data:', '*.googleusercontent.com'],
                            scriptSrc: [
                                "'self'",
                                "'sha256-3aXsHfTxKVinj0aTZEjIMCE1HLzHBZF3yUSSDt54BDg='",
                                'https://www.googletagmanager.com',
                            ],
                        },
                    },
                }),
            )
            .exclude(...excludes)
            .forRoutes('*');
    }
}
