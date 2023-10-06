import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './app/common/config/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './app/common/core/exceptions/Filters';

const configs = configuration()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }))
  app.useGlobalFilters(new HttpExceptionFilter())

  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector))
  );


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
