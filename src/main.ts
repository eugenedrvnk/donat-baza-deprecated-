import { NestFactory } from '@nestjs/core';
import { JoiPipe } from 'nestjs-joi';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new JoiPipe());
  await app.listen(3000);
}
bootstrap();
