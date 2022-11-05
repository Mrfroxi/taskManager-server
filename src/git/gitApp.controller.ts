import { Controller, Get, Post, Body } from '@nestjs/common';
import { gitAppService } from './gitApp.module';

@Controller('github')
export class gitAppController {
  constructor(private gitAppService: gitAppService) {}

  @Post()
  takeRequest(req) {
    console.log(req);
  }

  @Get()
  takeGet(req) {
    console.log(req);
  }
}
