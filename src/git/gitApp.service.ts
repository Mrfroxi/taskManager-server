import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PullRequest } from 'src/db/entities/pullRequest.entity';
import { Repository } from 'typeorm';
import { PullRequestObj } from './constructor /gitApp.constructor';

@Injectable()
export class gitAppService {
  constructor(
    @InjectRepository(PullRequest)
    private pullRequestRepository: Repository<PullRequest>,
  ) {}

  async setPullRequest(payload) {
    console.log(payload);
    //base ,this is the branch where the pull request will go
    //head ,this is the branch  where the pull request will be sent
    // const { title, user, body, created_at, base, head } = payload.pull_request;

    // const pullRequestEntity = new PullRequestObj(
    //   title,
    //   user.login,
    //   user.type,
    //   body,
    //   created_at,
    //   payload.repository.id,
    //   payload.repository.name,
    //   base.ref,
    //   head.ref,
    // );

    // const pullRequestObj = await this.pullRequestRepository.save(
    //   this.pullRequestRepository.create(pullRequestEntity),
    // );

    // return pullRequestObj;
  }
}
