import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // Setup swagger ui
  const swaggerConfig = new DocumentBuilder()
    .setTitle('CoffeeBucks')
    .setDescription('API for CoffeeBucks application')
    .setVersion('1.0')
    .addTag('Coffee')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  const port = process.env.PORT || 3000;

  // Set a global prefix called api
  app.setGlobalPrefix('api');

  await app.listen(port, '0.0.0.0');
}
bootstrap();
