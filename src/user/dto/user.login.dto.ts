import { IsString } from "class-validator";

export class UserLogInDto {
    @IsString()
    public username: string;

    @IsString()
    public password: string;
}