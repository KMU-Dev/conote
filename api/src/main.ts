import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DefaultValidationPipe } from './utils/pipes/default-validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new DefaultValidationPipe());
    await app.listen(8080);
}
bootstrap();
