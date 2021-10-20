import { Repository } from 'typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>
  ){}
  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepo.findOne({
      name: createRoleDto.name
    })

    if(role) {
      throw new BadRequestException({
        "message": "name exist"
      })
    }

    const newRole = await this.roleRepo.create(createRoleDto);

    return this.roleRepo.save(newRole);
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
