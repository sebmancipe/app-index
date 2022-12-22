import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { DatabaseModule } from '@/database/database.module';
import { UserModule } from '@/user/user.module';
import { LocationModule } from '@/location/location.module';
import { ProfileModule } from '@/profile/profile.module';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    LocationModule,
    ProfileModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
