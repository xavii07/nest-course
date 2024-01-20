import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, //TODO: Transformar dtos -> consumo de memoria
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  //TODO: Permite extender la ruta de la API
  app.setGlobalPrefix('api/v2');

  await app.listen(3000);
}
bootstrap();
