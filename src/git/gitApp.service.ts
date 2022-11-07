import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PullRequest } from 'src/db/entities/pullRequest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class gitAppService {
  constructor(
    @InjectRepository(PullRequest)
    private pullRequestRepository: Repository<PullRequest>,
  ) {}

  async setPullRequest(body) {
    console.log(body);
  }
}
