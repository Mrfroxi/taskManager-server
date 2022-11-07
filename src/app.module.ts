import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './db/entities/user.entity';
import { RefreshToken } from './db/entities/refreshToken.entity';
import { Union } from './db/entities/union.entity';
import { Permission } from './db/entities/permission.entity';
import { Task } from './db/entities/task.entity';
import { Language } from './db/entities/language.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { MailModule } from './mail/mail.module';
import fs = require('fs');

import { PullRequest } from './db/entities/pullRequest.entity';
import { gitAppModule } from './git/gitApp.module';
@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        RefreshToken,
        Union,
        Permission,
        Task,
        Language,
        PullRequest,
      ],
      synchronize: true,
      ssl: {
        ca: fs.readFileSync('ca-certificate.crt'),
      },
    }),
    UsersModule,
    AuthModule,
    RefreshTokenModule,
    MailModule,
    gitAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
