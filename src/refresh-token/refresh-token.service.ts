import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from 'src/db/entities/refreshToken.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { DecodeVerifyToken } from './dto/refresh-token.dto';
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

  public receivingDateToken(token: number) {
    const expireDate: Date = this.getTokenDate(token);

    const dateNow: Date = new Date();

    return expireDate.getTime() - dateNow.getTime();
  }

  public getTokenDate(format: number): Date {
    const startDate = new Date(0);
    startDate.setUTCSeconds(format);
    return startDate;
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

  async getVerifyToken(user) {
    const { id } = user;

    const payload = { id };

    const token = this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY_JWT_VERIFY,
      expiresIn: `${process.env.EXPIRESIN_VERIFY}`,
    });

    return `${token}`;
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

  async decodeVerifyToken(token: string) {
    const user: DecodeVerifyToken = await this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY_JWT_VERIFY,
    });

    const timeDiff = this.receivingDateToken(user.exp);

    if (!timeDiff) {
      return { id: user.id, status: false };
    }

    if (timeDiff > 0) {
      return { id: user.id, status: true };
    } else {
      return { id: user.id, status: false };
    }
  }

  async decodeAccessToken(token: string) {
    const user = await this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY_JWT_ACCESS,
    });

    const timeDiff = this.receivingDateToken(user.exp);

    if (!timeDiff) {
      return null;
    }

    if (timeDiff > 0) {
      return user.id;
    } else {
      return null;
    }
  }

  async decodeRefreshToken(token: string) {
    const user = await this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY_JWT_REFRESH,
    });

    const timeDiff = this.receivingDateToken(user.exp);

    if (!timeDiff) {
      return null;
    }

    if (timeDiff > 0) {
      return user.id;
    } else {
      return null;
    }
  }
}
