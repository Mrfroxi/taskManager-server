import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MailService } from 'src/mail/mail.service';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authenticationService: AuthService,
    private refreshTokenService: RefreshTokenService,
    private mailService: MailService,
    private userService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('log-in')
  async logIn(@Req() request) {
    const { user } = request;

    const accessTokenCookie =
      await this.refreshTokenService.getCookieWithJwtAccessToken(user.id);

    const refreshToken =
      await this.refreshTokenService.getCookieWithJwtRefreshToken();

    const { hashString, refreshTokenCookie } = refreshToken;

    await this.refreshTokenService.setCurrentRefreshToken(
      hashString,
      refreshTokenCookie,
      user.id,
    );

    await request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);

    return user;
  }

  @ApiOperation({ summary: 'user creation' })
  @ApiResponse({ status: 200, type: CreateUserDto })
  @Post('createUser')
  async create(@Req() request) {
    const { body } = request;

    const user = await this.userService.createUser(body);

    const { accessTokenCookie, refreshTokenCookie, verifyToken } =
      await this.authenticationService.getAllRegistrationTokens(user);

    await request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);

    // const sentLetter = await this.mailService.sendUserConfirmation(
    //   verifyToken,
    //   user,
    // );

    return user;
  }

  @Get('verify/:token')
  async verifyUserGmail(@Param('token') token) {
    const transferredUser = await this.refreshTokenService.decodeVerifyToken(
      token,
    );

    if (transferredUser) {
    } else {
      throw new HttpException('e-mail timed out', HttpStatus.FORBIDDEN);
    }
  }
}
