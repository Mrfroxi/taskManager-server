import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/db/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async validateUser(email: string, pass: string) {
    const user: User = await this.usersService.findUserByEmail(email);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userInfo } = user;
      return userInfo;
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  async signUp() {
    const token = Math.floor(1000 + Math.random() * 9000).toString();

    await this.mailService.sendUserConfirmation();
  }
}
