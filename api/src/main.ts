import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/filters/all-exceptions.filter';
import { PrismaKnonwRequestErrorFilter } from './utils/filters/prisma-known-request.filter';
import { DefaultValidationPipe } from './utils/pipes/default-validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // setup middlewares
    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: { imgSrc: ["'self'", 'data:', '*.googleusercontent.com'] },
            },
        }),
        cookieParser(),
    );
    app.useGlobalFilters(new AllExceptionsFilter(), new PrismaKnonwRequestErrorFilter());
    app.useGlobalPipes(new DefaultValidationPipe());

    await app.listen(8080);
}
bootstrap();
