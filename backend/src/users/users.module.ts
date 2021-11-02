import { Department } from 'src/departments/entities/department.entity';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([
      User,
      Department
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  // khi depen service vao module khac
  exports: [UsersService]
})
export class UsersModule {}
