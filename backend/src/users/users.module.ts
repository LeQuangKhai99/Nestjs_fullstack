import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  // khi depen service vao module khac
  exports: [UsersService]
})
export class UsersModule {}
