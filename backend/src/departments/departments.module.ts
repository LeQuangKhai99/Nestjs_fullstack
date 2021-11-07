import { Calender } from './../calenders/entities/calender.entity';
import { UsersService } from './../users/users.service';
import { User } from './../users/entities/user.entity';
import { Department } from './entities/department.entity';
import { Role } from './../roles/entities/role.entity';
import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from 'src/requests/entities/request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Department, User, Calender, Request])
  ],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, UsersService], 
})
export class DepartmentsModule {}
