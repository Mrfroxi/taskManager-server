import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from 'src/db/entities/refreshToken.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}
  async setCurrentRefreshToken(refreshToken, UserId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.refreshTokenRepository
      .createQueryBuilder()
      .update(RefreshToken)
      .set({ value: currentHashedRefreshToken, user: { id: UserId } })
      .where('id = :id', { id: UserId })
      .execute();
  }
}
