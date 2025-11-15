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

  // Validation Pipes

    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((err) => {
          if (err.constraints) {
            return Object.values(err.constraints);
          }
          return [`Invalid field: ${err.property}`];
        });
        return new BadRequestException(messages.flat());
      },
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
