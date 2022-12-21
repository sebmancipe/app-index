import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
