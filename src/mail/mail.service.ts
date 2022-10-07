import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

  async sendUserConfirmation() {
    const url = `https://github.com/Mrfroxi`;

    await this.mailerService.sendMail({
      to: 'froxi340@mail.ru',
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', 
      context: { 
        name: 'Mrfroxi',
        url,
      },
    });
  }
}
