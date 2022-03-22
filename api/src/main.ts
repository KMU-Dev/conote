import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SentryGraphQLInterceptor } from './sentry/sentry-graphql.interceptor';
import { AllExceptionsFilter } from './utils/filters/all-exceptions.filter';
import { PrismaKnonwRequestErrorFilter } from './utils/filters/prisma-known-request.filter';
import { DefaultValidationPipe } from './utils/pipes/default-validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // setup middlewares
    app.use(cookieParser());
    app.useGlobalFilters(new AllExceptionsFilter(), new PrismaKnonwRequestErrorFilter());
    app.useGlobalPipes(new DefaultValidationPipe());
    app.useGlobalInterceptors(new SentryGraphQLInterceptor());

    app.enableShutdownHooks();

    await app.listen(8080);
}

// Get app root path
global.__rootdir__ = __dirname || process.cwd();

bootstrap();
