import { ApplicationException } from '@/exception/application.exception';
import { ApplicationExceptionTypes } from '@/exception/exception.handler';
import { HttpStatus } from '@nestjs/common';

export class UserLogInException extends ApplicationException {
  public static userMissingOrPasswordMismatch(): UserLogInException {
    return new this(
      ApplicationExceptionTypes.PasswordMismatchOrUnexistentUser,
      'The given password is incorrect or the user does not exist',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
