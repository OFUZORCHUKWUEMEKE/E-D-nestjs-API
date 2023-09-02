import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './app/common/config/config';
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const configs = configuration()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }))


  const config = new DocumentBuilder()
    .setTitle('Egg Depot v2')
    .setDescription('An Egg Delivery Platform')
    .setVersion('1.0')
    .addTag('eggs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document)

  await app.listen(configs.PORT);
}
bootstrap();
