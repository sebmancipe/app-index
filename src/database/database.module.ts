import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import dataSource from '@/database/data-source';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<DataSource> => {
        return dataSource.initialize();
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
