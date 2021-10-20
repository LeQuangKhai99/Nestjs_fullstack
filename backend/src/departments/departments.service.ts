import { UsersService } from './../users/users.service';
import { User } from './../users/entities/user.entity';
import { Department } from './entities/department.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepo: Repository<Department>,
    private readonly userService: UsersService
  ){}
  async create(createDepartmentDto: CreateDepartmentDto) {
    const department = await this.departmentRepo.findOne({
      name: createDepartmentDto.name
    });

    if(await this.findDepartmentByUser(createDepartmentDto.manage)) {
      throw new BadRequestException({
        "message": "This user is already a manager"
      });
    }

    if(department) {
      throw new BadRequestException({
        "message": "name is exist"
      })
    }
    const newDepartment = await this.departmentRepo.create(createDepartmentDto);
    return this.departmentRepo.save(newDepartment);
  }

  async findDepartmentByUser(user: User) {
    return await this.departmentRepo.findOne({
      manage: user
    });
  }

  findAll() {
    return `This action returns all departments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
