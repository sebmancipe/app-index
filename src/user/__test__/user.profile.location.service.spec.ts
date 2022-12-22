import { DataSource, QueryRunner } from 'typeorm';
import { ProfileService } from '@/user/profile.service';
import { UserProfileLocationService } from '@/user/user.profile.location.service';
import { LocationService } from '@/location/location.service';
import { UserService } from '@/user/user.service';
import { UserCreationException } from '@/user/exception';
import { UserDto } from '@/user/dto/user.dto';
import { ProfileDto } from '@/user/dto/profile.dto';
import { FullAddressDto } from '@/location/dto/full.address.dto';

describe('[UserProfileLocationService]', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createQueryRunnerMock = jest.fn();
  const dataSourceMock = {
    createQueryRunner: createQueryRunnerMock,
  } as any as DataSource;

  const startTransactionMock = jest.fn();
  const commitTransactionMock = jest.fn();
  const rollbackTransactionMock = jest.fn();
  const queryRunnerMock = {
    startTransaction: startTransactionMock,
    commitTransaction: commitTransactionMock,
    rollbackTransaction: rollbackTransactionMock,
  } as any as QueryRunner;

  const getCityMock = jest.fn();
  const createAddressMock = jest.fn();
  const getFullAddressMock = jest.fn();
  const locationServiceMock = {
    getCity: getCityMock,
    createAddress: createAddressMock,
    getFullAddress: getFullAddressMock,
  } as any as LocationService;

  const createProfileMock = jest.fn();
  const getProfileMock = jest.fn();
  const profileServiceMock = {
    createProfile: createProfileMock,
    getProfile: getProfileMock,
  } as any as ProfileService;

  const getUserMock = jest.fn();
  const saveUserMock = jest.fn();
  const userServiceMock = {
    getUser: getUserMock,
    saveUser: saveUserMock,
  } as any as UserService;

  it('When creating a profile, throws exception because of unexistent city or user', async () => {
    createQueryRunnerMock.mockReturnValue(queryRunnerMock);

    getCityMock.mockResolvedValue(null);
    getUserMock.mockResolvedValueOnce(null);

    const userProfileLocationService = new UserProfileLocationService(
      locationServiceMock,
      profileServiceMock,
      userServiceMock,
      dataSourceMock,
    );

    try {
      const userProfileLocation =
        await userProfileLocationService.createUserProfile({
          username: 'pepe',
          password: 'my-pass',
          name: 'Pepe Gonzales',
          address: 'Bakery St',
          cityId: 15,
        });
    } catch (e) {
      expect(e).toBeInstanceOf(UserCreationException);
      expect(e.message).toEqual('The cityId provided does not exists');
    }

    expect(startTransactionMock).not.toBeCalled();
    expect(commitTransactionMock).not.toBeCalled();
  });

  it('Gets a profile using an userId', async () => {
    getUserMock.mockResolvedValue({ id: 15 } as UserDto);
    getProfileMock.mockResolvedValue({ name: 'Pepe Gonzales' } as ProfileDto);
    getFullAddressMock.mockResolvedValue({
      street: 'Bakery St',
      cityName: 'Marsella',
      countryName: 'France',
    } as FullAddressDto);

    const userProfileLocationService = new UserProfileLocationService(
      locationServiceMock,
      profileServiceMock,
      userServiceMock,
      dataSourceMock,
    );

    const profileLocationAddress =
      await userProfileLocationService.getUserProfileAndLocation('pepe');

    expect(profileLocationAddress.id).toEqual(15);
    expect(profileLocationAddress.name).toEqual('Pepe Gonzales');
    expect(profileLocationAddress.address).toEqual({
      street: 'Bakery St',
      city: 'Marsella',
      country: 'France',
    });
    expect(createQueryRunnerMock).toBeCalledTimes(1);
    expect(startTransactionMock).not.toBeCalled();
    expect(commitTransactionMock).not.toBeCalled();
    expect(rollbackTransactionMock).not.toBeCalled();
  });
});
