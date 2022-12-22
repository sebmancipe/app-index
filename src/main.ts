import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ExceptionHandler } from '@/exception/exception.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  app.useGlobalFilters(new ExceptionHandler());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
