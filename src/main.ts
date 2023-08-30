import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './app/common/config/config';
import {ValidationPipe} from '@nestjs/common'

const config = configuration()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform:true,
    whitelist:true
  }))

  await app.listen(config.PORT);
}
bootstrap();
