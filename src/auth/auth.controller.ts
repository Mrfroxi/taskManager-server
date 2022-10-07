import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
// import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authenticationService: AuthService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('log-in')
  async logIn(@Req() request) {
    const { user } = request;
    const accessTokenCookie =
      await this.refreshTokenService.getCookieWithJwtAccessToken(user.id);

    const refreshTokenCookie =
      await this.refreshTokenService.getCookieWithJwtRefreshToken();

    const { hashString, refreshcookie } = refreshTokenCookie;

    await this.refreshTokenService.setCurrentRefreshToken(
      hashString,
      refreshcookie,
      user.id,
    );

    await request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshcookie,
    ]);

    return user;
  }

  @Post('mail')
  async SendMail(){
    let mail = this.authenticationService.signUp()
  }
}
