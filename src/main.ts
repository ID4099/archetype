import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const { PORT } = process.env

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('Welcome to Tasks CRUD')
    .setVersion('1.0')
    .addTag('TASKS')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT || 3000, () => console.log(`Task server on localhost:${PORT}`));
}
bootstrap();
