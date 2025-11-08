import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { documentOptions, swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Init Swagger */
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig, documentOptions);
  SwaggerModule.setup('api/docs', app, documentFactory);
  
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
