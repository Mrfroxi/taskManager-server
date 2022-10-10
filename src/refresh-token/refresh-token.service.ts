import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from 'src/db/entities/refreshToken.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  public takeTokenFromString(token: string) {
    return token.split(';')[0].split('=')[1];
  }

  public takeExpireInFromString(token: string) {
    const dateNow = new Date();
    const tokenTime = token.split(';')[3].split('=')[1].slice(0, -1);
    const endtime = new Date(+dateNow + +tokenTime * 6e4);
    return endtime;
  }

  async setCurrentRefreshToken(
    hashString: string,
    token: string,
    UserId: number,
  ) {
    const tokenExpiresIn = await this.takeExpireInFromString(token);
    await this.refreshTokenRepository
      .createQueryBuilder()
      .update(RefreshToken)
      .set({
        value: hashString,
        user: { id: UserId },
        expires_in: tokenExpiresIn,
      })
      .where('id = :id', { id: UserId })
      .execute();
  }

  async getCookieWithJwtAccessToken(userId: number) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY_JWT_ACCESS,
      expiresIn: `${process.env.EXPIRESIN_ACCESS}`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.EXPIRESIN_ACCESS}`;
  }

  async getCookieWithJwtRefreshToken() {
    const hashString = await bcrypt.hash(uuid(), 3);

    const payload = { hashString };

    const token = this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY_JWT_REFRESH,
      expiresIn: `${process.env.EXPIRESIN_REFRESH}`,
    });

    const refreshTokenCookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${process.env.EXPIRESIN_REFRESH}`;

    return { refreshTokenCookie, hashString };
  }


  async getVerifyToken(user){
    const { id } = user ;

    const payload = {id};

    const token = this.jwtService.sign(payload,{
      secret: process.env.SECRET_KEY_JWT_REFRESH,
      expiresIn: `${process.env.EXPIRESIN_REFRESH}`,
    })
    
    return token;
  }

  async createRefreshToken(hashString: string, token: string, userId: number) {
    const tokenExpiresIn = await this.takeExpireInFromString(token);

    const refreshToken = await this.refreshTokenRepository.create({
      value: hashString,
      expires_in: tokenExpiresIn,
      user: { id: userId },
    });
    await this.refreshTokenRepository.save(refreshToken);
    return refreshToken;
  }
}
