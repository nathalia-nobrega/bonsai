import { HttpException, HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class ResourceNotFoundException extends AppException {
  constructor(resourceType: string, resourceIdentifier: string) {
    const message = `${resourceType} with identifier ${resourceIdentifier} not found`;
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class ResourceAlreadyExists extends HttpException {
  constructor(resourceType: string, resourceIdentifier: string) {
    const message = `${resourceType} with identifier ${resourceIdentifier} already registered`;
    super(message, HttpStatus.CONFLICT);
  }
}
