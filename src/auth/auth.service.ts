import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/db/entities/user.entity';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user: User = await this.usersService.findUserByEmail(email);
    console.log(user);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userInfo } = user;
      return userInfo;
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  async getAllRegistrationTokens(user) {
    const accessTokenCookie =
      await this.refreshTokenService.getCookieWithJwtAccessToken(user.id);

    const refreshToken =
      await this.refreshTokenService.getCookieWithJwtRefreshToken();

    const { hashString, refreshTokenCookie } = refreshToken;

    await this.refreshTokenService.createRefreshToken(
      hashString,
      refreshTokenCookie,
      user.id,
    );

    const verifyToken = await this.refreshTokenService.getVerifyToken(user);

    return { accessTokenCookie, refreshTokenCookie, verifyToken };
  }
}
