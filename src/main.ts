import { HttpException, HttpStatus } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({
  //   origin: function (origin, callback) {
  //     if (!origin || process.env.WHITEHOST === origin) {
  //       callback(null, true);
  //     } else {
  //       throw new HttpException('Not allowed by CORS', HttpStatus.FORBIDDEN);
  //     }
  //   },
  // });
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('task-project')
    .setDescription('Documentation REST API')
    .setVersion('0.0.1')
    .addTag('TSKP')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
