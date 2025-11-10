import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus,
    public readonly errorCode?: string,
    public readonly details?: unknown
  ) {
    super(
      {
        message,
        errorCode,
        details,
      },
      statusCode
    );
  }
}
