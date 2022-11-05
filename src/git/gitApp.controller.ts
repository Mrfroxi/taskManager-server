import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { gitAppService } from './gitApp.module';

@Controller('github')
export class gitAppController {
  constructor(private gitAppService: gitAppService) {}

  //   @Post()
  //   takeRequest(@Req() req: Request) {
  //     console.log(req);
  //   }

  @Get()
  takeGet(@Req() req: Request) {
    console.log(req);
  }
}
