import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CityDto {
  constructor(object: Partial<CityDto>) {
    Object.assign(this, { ...object });
  }

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsInt()
  @IsNotEmpty()
  public id: number;
}
