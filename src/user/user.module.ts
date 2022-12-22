import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { LocationModule } from '@/location/location.module';
import { LocationService } from '@/location/location.service';
import { ProfileService } from '@/user/profile.service';
import { UserProfileLocationService } from '@/user/user.profile.location.service';
import { UserService } from '@/user/user.service';
import { Hasher } from '@/user/hasher/hasher';

@Module({
  imports: [DatabaseModule, LocationModule],
  controllers: [],
  providers: [
    LocationService,
    ProfileService,
    UserProfileLocationService,
    UserService,
    Hasher,
  ],
  exports: [UserProfileLocationService],
})
export class UserModule {}
