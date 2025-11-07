import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Init Swagger */
  const config = new DocumentBuilder()
  .setTitle('Bonsai API v1')
  .setDescription("The official documentation for the Bonsai API")
  .setVersion('1.0')
  .addTag("bonsai")
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
