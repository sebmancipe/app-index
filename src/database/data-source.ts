import { DataSource, DataSourceOptions } from 'typeorm';

const connectionOptions: DataSourceOptions = {
  type: 'mysql',
  timezone: process.env.TZ || 'UTC',
  host: process.env.DATABASE_HOST || '',
  username: process.env.DATABASE_USERNAME || '',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_NAME || '',
  port: Number(process.env.DATABASE_PORT) || 3306,
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
};

export default new DataSource(connectionOptions);
