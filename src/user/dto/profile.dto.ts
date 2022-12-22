import { IsNotEmpty, IsString } from 'class-validator';

export class ProfileDto {
  constructor(object: Partial<ProfileDto>) {
    Object.assign(this, { ...object });
  }

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  public addressId: number;

  @IsNotEmpty()
  public userId: number;
}
