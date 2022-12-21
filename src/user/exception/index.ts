import { ApplicationException } from "@/exception/application.exception";
import { ApplicationExceptionTypes } from "@/exception/exception.handler";
import { HttpStatus } from "@nestjs/common";

export class UserCreationException extends ApplicationException {
    public static cityDoesNotExists(): UserCreationException {
        return new this(ApplicationExceptionTypes.UnableToCreateUserBecauseOfCity, 'The cityId provided does not exists', HttpStatus.CONFLICT);
    }

    public static userAlreadyExists(): UserCreationException {
        return new this(ApplicationExceptionTypes.UnableToCreateUserBecauseOfUser, 'The user given already exists in the database', HttpStatus.CONFLICT);
    }

    public static databaseException(e: Error): UserCreationException {
        return new this(ApplicationExceptionTypes.UnableToCreateUserBecauseOfDatabaseException, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}