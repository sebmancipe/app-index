import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { LocationService } from '@/location/location.service';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [LocationService],
})
export class LocationModule {}
