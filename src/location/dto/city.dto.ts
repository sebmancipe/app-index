import { IsInt, IsNotEmpty, IsObject, IsString } from "class-validator";
import { CountryDto } from "@/location/dto/country.dto";

export class CityDto {
    @IsNotEmpty()
    @IsString()
    public name: string;
    
    @IsObject()
    public country: CountryDto;

    @IsInt()
    @IsNotEmpty()
    public id: number;
}