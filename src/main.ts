import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('task-project')
    .setDescription('Documentation REST API')
    .setVersion('0.0.1')
    .addTag('TSKP')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(5500, () =>
    console.log('node application started at 5000 port '),
  );
}
bootstrap();
