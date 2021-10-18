import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      // quăng lỗi khi có các thuộc tính thừa
      forbidNonWhitelisted: true,
      // loại bỏ các thuộc tính không hợp lệ
      whitelist: true
    }
  ));
  const config = new DocumentBuilder()
    .setTitle('Manage employee')
    .setDescription('The manage user API description')
    .setVersion('1.0')
    .addTag('Employee')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
