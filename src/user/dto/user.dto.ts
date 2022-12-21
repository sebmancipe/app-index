import { ProfileDto } from "@/user/dto/profile.dto";
import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class UserDto {
    constructor(object: Partial<UserDto>) {
        Object.assign(this, { ...object });
    }

    @IsOptional()
    public id: number;

    @IsNotEmpty()
    @IsString()
    public username: string;

    @IsNotEmpty()
    @IsString()
    public password: string;

    @IsOptional()
    @IsObject()
    public profile: ProfileDto;
}