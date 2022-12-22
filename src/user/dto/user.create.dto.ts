import { IsString, IsNotEmpty } from 'class-validator';

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
