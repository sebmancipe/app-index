import { Global, Module } from "@nestjs/common";
import { DataSourceOptions, DataSource } from "typeorm";

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<DataSource> => {
        const connectionOptions: DataSourceOptions = {
            type: 'mysql',
            timezone: process.env.TZ || 'UTC',
            host: process.env.DATABASE_HOST || '',
            username: process.env.DATABASE_USERNAME || '',
            password: process.env.DATABASE_PASSWORD || '',
            database: process.env.DATABASE_NAME || '',
            port: Number(process.env.DATABASE_PORT) || 3306,
            synchronize: false,
            migrationsRun: false,
        }

        return new DataSource(connectionOptions).initialize();
      },
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}