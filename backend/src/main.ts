import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
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
  await app.listen(3000);
}
bootstrap();
