import { Inject, Injectable } from '@nestjs/common';
import { LocationService } from '@//location/location.service';
import { ProfileService } from '@/user/profile.service';
import { UserCreateDto } from '@/user/dto/user.create.dto';
import { UserService } from '@/user/user.service';
import { UserProfileLocation } from '@/user/dto/output.dto';
import { DataSource, QueryRunner } from 'typeorm';
import { UserCreationException } from '@/user/exception';

@Injectable()
export class UserProfileLocationService {
  private queryRunner: QueryRunner;

  constructor(
    private readonly locationService: LocationService,
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
    @Inject('DATABASE_CONNECTION')
    dataSource: DataSource,
) {
  this.queryRunner = dataSource.createQueryRunner();
}

  public async createUserProfile(user: UserCreateDto): Promise<UserProfileLocation> {
    const cityExists = !!(await this.locationService.getCity(user.cityId));
    const userDoesNotExists = !!!(await this.userService.getUser(user.username));

    if (cityExists && userDoesNotExists) {
      try {
        await this.queryRunner.startTransaction();

        const addressId = await this.locationService.createAddress(user.cityId, user.address);
        const userId = await this.userService.saveUser(user.username, user.password);

        await this.profileService.createProfile(userId, addressId, user.name);

        await this.queryRunner.commitTransaction();

        return await this.getUserProfileAndLocation(user.username);
      } catch (e) {
        await this.queryRunner.rollbackTransaction();

        throw UserCreationException.databaseException(e);
      }
    }

    throw (!cityExists) ? UserCreationException.cityDoesNotExists() : UserCreationException.userAlreadyExists();
  }

  public async getUserProfileAndLocation(username: string): Promise<UserProfileLocation> {
    const user = await this.userService.getUser(username);
    const profile = await this.profileService.getProfile(user.id);
    const address = await this.locationService.getFullAddress(profile.addressId);

    return {
      id: user.id,
      name: profile.name,
      address: {
        street: address.street,
        city: address.cityName,
        country: address.countryName,
      }
    }
  }
}
