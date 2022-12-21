import { Injectable } from '@nestjs/common';
import { LocationService } from '@//location/location.service';
import { ProfileService } from '@/user/profile.service';
import { UserCreateDto } from '@/user/dto/user.create.dto';
import { UserService } from '@/user/user.service';
import { UserProfileLocation } from '@/user/dto/output.dto';

@Injectable()
export class UserProfileLocationService {
  constructor(
    private readonly locationService: LocationService,
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
) {
}

//TODO: Check for exceptions and start transactions
  public async createUserProfile(user: UserCreateDto): Promise<UserProfileLocation> {
    const cityExists = !!(await this.locationService.getCity(user.cityId));
    const userDoesNotExists = !!!(await this.userService.getUser(user.username));

    if (cityExists && userDoesNotExists) {
      const addressId = await this.locationService.createAddress(user.cityId, user.address);
      const userId = await this.userService.saveUser(user.username, user.password);

      await this.profileService.createProfile(userId, addressId, user.name);

      return await this.getUserProfileAndLocation(user.username);
    }
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
