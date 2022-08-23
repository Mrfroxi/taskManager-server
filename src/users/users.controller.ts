import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/db/entities/user.entity';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  @ApiOperation({ summary: 'user creation' })
  @ApiResponse({ status: 200, type: CreateUserDto })
  @Post('createUser')
  async create(@Req() request) {
    const { body } = request;
    const user = await this.userService.createUser(body);
    const accessTokenCookie =
      await this.refreshTokenService.getCookieWithJwtAccessToken(user.id);

    const refreshTokenCookie =
      await this.refreshTokenService.getCookieWithJwtRefreshToken();
    const { hashString, refreshcookie } = refreshTokenCookie;

    await this.refreshTokenService.createRefreshToken(
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

  @ApiOperation({ summary: 'user search by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }
}
