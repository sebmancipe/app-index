import { IsNotEmpty, IsString } from "class-validator";

export class CountryDto {
    @IsNotEmpty()
    @IsString()
    public name: string;
}