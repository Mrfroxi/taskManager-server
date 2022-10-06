import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: process.env.HOST_NODEMAILER,
          port: process.env.HOST_PORT,
          secure: false,
          auth: {
            user: process.env.HOST_USER,
            pass: process.env.HOST_HOST_PASS,
          },
        },
        defaults: {
          from: `"No Reply" <${process.env.HOST_USER}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
