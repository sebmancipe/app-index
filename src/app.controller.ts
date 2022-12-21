import { Controller, Get, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly dataSource: DataSource,
  ) {
  }

  @Get('/status')
  async getApplicationStatus(): Promise<unknown> {
    return {
      serviceAvailable: true,
      dataSourceStatus: this.dataSource.isInitialized
    }
  }
}
