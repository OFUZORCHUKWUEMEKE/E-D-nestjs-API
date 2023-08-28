import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './app/common/config/config';

const config = configuration()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.PORT);
}
bootstrap();
