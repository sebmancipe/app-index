import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { CityDto } from "@/location/dto/city.dto";

export class AddressDto {
    constructor(object: Partial<AddressDto>) {
        Object.assign(this, { ...object });
    }

    @IsNotEmpty()
    @IsString()
    public street: string;

    @IsObject()
    public city: CityDto;
}

export class FullAddressDto {
    constructor(object: Partial<FullAddressDto>) {
        Object.assign(this, { ...object });
    }

    @IsNotEmpty()
    @IsString()
    public street: string;

    @IsString()
    public cityName: string;

    @IsString()
    public countryName: string;
}