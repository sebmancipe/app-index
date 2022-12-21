import { IsString, IsNotEmpty } from "class-validator";

//TODO: This thing is not validating keys strictly
export class UserCreateDto {
    @IsString()
    @IsNotEmpty()
    public username: string;

    @IsString()
    @IsNotEmpty()
    public password: string;

    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsNotEmpty()
    public address: string;

    @IsNotEmpty()
    public cityId: number;
}