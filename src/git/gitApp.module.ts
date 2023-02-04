import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PullRequest } from 'src/db/entities/pullRequest.entity';
import { gitAppController } from './gitApp.controller';
import { gitAppService } from './gitApp.service';

@Module({
  imports: [TypeOrmModule.forFeature([PullRequest])],
  controllers: [gitAppController],
  providers: [gitAppService],
})
export class gitAppModule {}
