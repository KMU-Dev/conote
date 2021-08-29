import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/filters/all-exceptions.filter';
import { DefaultValidationPipe } from './utils/pipes/default-validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalPipes(new DefaultValidationPipe());
    await app.listen(8080);
}
bootstrap();
