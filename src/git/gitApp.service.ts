import { Module } from '@nestjs/common';
import { gitAppController } from './gitApp.controller';
import { gitAppService } from './gitApp.module';

@Module({
  controllers: [gitAppController],
  providers: [gitAppService],
})
export class gitAppModule {}
