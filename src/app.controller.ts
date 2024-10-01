import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Render('index')
  getIndexPage(@Res() response: Response) {
    const processingTime = this.getProcessingTime(response);
    return { user: 'index.hbs', processingTime };
  }

  private getProcessingTime(response: Response): string {
    const processingTimeHeader = response.getHeader('X-Processing-Time');
    return processingTimeHeader ? '${processingTimeHeader}ms' : 'N/A';
  }
}
