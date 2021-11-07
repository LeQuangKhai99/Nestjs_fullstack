import { Department } from 'src/departments/entities/department.entity';
import { UsersService } from './../users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Calender } from './entities/calender.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CalendersService } from './calenders.service';
import { CalendersController } from './calenders.controller';
import { Request } from 'src/requests/entities/request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Calender, User, Department, Request])
  ],
  controllers: [CalendersController],
  providers: [CalendersService, UsersService]
})
export class CalendersModule {}
