import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({}));

  // should be disabled on non production
  // both client and server hadnled on webpack or gateway
  app.enableCors({});

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Server is listening on ${port}`);
}
bootstrap();
