import { IsNotEmpty, IsString } from 'class-validator';
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
