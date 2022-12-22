import { HttpException, HttpStatus } from '@nestjs/common';
import { ApplicationExceptionTypes } from '@/exception/exception.handler';

export class ApplicationException extends HttpException {
  constructor(
    private code: ApplicationExceptionTypes,
    message: string,
    status: HttpStatus,
  ) {
    super(message, status);
  }

  public serialize(): unknown {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
