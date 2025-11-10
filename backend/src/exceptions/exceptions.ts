import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

/* Every new exception type must be added here! */
export class ResourceNotFoundException extends AppException {
  constructor(resourceType: string, resourceIdentifier: string) {
    const message = `${resourceType} with identifier ${resourceIdentifier} not found`;
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class ResourceAlreadyExists extends AppException {
  constructor(resourceType: string, resourceIdentifier: string) {
    const message = `${resourceType} with identifier ${resourceIdentifier} already registered`;
    super(message, HttpStatus.CONFLICT);
  }
}
