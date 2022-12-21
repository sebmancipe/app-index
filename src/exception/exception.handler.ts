import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from "@nestjs/common";
import { ApplicationException } from "./application.exception";

@Catch()
export class ExceptionHandler implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        if (exception instanceof ApplicationException) {
          response.status(exception.getStatus()).json(exception.serialize());
    
          return;
        }
    
        if (exception instanceof HttpException) {
          response.status(exception.getStatus()).json({
            message: exception.message,
            code: exception.getStatus()
          });
    
          return;
        }
    
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: exception.message,
          url: request.url,
        });
      }
};

export enum ApplicationExceptionTypes {
  //User creation
  UnableToCreateUserBecauseOfCity = 'UNABLE-TO-CREATE-USER-BECAUSE-CITY-DOES-NOT-EXIST',
  UnableToCreateUserBecauseOfUser = 'UNABLE-TO-CREATE-USER-BECAUSE-USER-EXISTS',
  UnableToCreateUserBecauseOfDatabaseException = 'UNABLE-TO-CREATE-USER-BECAUSE-DATABASE-EXCEPTION',
};  