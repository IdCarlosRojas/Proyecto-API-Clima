import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // ¡SUPER IMPORTANTE para que el HTML funcione!
  await app.listen(3000);
}
bootstrap();