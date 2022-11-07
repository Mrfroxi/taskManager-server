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
    //base ,this is the branch where the pull request will go
    //head ,this is the branch  where the pull request will be sent
    const { pull_request, user, body, created_at, base, head, repository } =
      payload;
    console.log(pull_request.user);
    console.log(pull_request.created_at);
    // const pullRequest = new PullRequestObj(
    //   pull_request.title,
    //   user.login,
    //   user.type,
    //   body,
    //   created_at,
    //   repository.id,
    //   repository.name,
    //   base.ref,
    //   head.ref,
    // );
    // console.log(pull_Request);
  }
}
