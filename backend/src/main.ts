import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { documentOptions, swaggerConfig } from './config/swagger.config';
import { GlobalExceptionFilter } from './exceptions/global-exception-filter';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Init Swagger */
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig, documentOptions);
  SwaggerModule.setup('api/docs', app, documentFactory);

  /* Exception filters */
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.setGlobalPrefix('api');

  // Configuração global do ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints ? error.constraints[Object.keys(error.constraints)[0]] : 'Validation error',
        }));
        return new BadRequestException({
          message: 'Validation failed',
          errors: result,
          error: 'Bad Request',
          statusCode: 400,
        });
      },
    })
  );

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
