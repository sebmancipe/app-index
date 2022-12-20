import { Controller, Get, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from '@/app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    @Inject('DATABASE_CONNECTION')
    private readonly dataSource: DataSource
    ) {
    }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/application/status')
  getApplicationStatus(): unknown {
    return {
      serviceAvailable: true,
      dataSourceStatus: this.dataSource.isInitialized
    }
  }
}
