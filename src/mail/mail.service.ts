import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(token,user) {
    const {userName,email} = user;

    const url = `http://localhost:3000/auth/verify/${token}`;

    await this.mailerService.sendMail({
      to: `${email}`,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', 
      context: { 
        userName: `${userName}`,
        url,
      },
    });
  }
}
