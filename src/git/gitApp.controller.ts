import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { gitAppService } from './gitApp.service';

@Controller('github')
export class gitAppController {
  constructor(private gitAppService: gitAppService) {}

  @Post()
  takeRequest(@Req() req) {
    console.log(req.body);
  }
}
