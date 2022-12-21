import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { UserProfileLocationService } from '@/user/user.profile.location.service';
import { DatabaseModule } from '@/database/database.module';
import { UserModule } from '@/user/user.module';
import { LocationModule } from '@/location/location.module';
import { UserService } from '@/user/user.service';
import { LocationService } from '@/location/location.service';
import { ProfileService } from '@/user/profile.service';

@Module({
  imports: [DatabaseModule, UserModule, LocationModule],
  controllers: [AppController],
  providers: [UserProfileLocationService, UserService, LocationService, ProfileService],
})
export class AppModule {}
