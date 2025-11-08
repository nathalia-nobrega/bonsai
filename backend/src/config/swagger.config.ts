import { DocumentBuilder, SwaggerDocumentOptions } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Bonsai API v1')
  .setDescription("The official documentation for the Bonsai API")
  .setVersion('1.0')
  .addServer('http://localhost:3000', 'Development')
  .addTag("bonsai")
  .build();

  export const documentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => {
      const controller = controllerKey
        .replace('Controller', '')
        .charAt(0).toLowerCase() + 
        controllerKey.replace('Controller', '').slice(1);

      return `${controller}.${methodKey}`; // users.findAll, users.create, products.getById
    },
    ignoreGlobalPrefix: false
  };