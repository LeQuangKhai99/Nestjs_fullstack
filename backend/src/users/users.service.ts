import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.findOne({
      email: createUserDto.email
    })

    if(user) {
      throw new BadRequestException({
        "message": "email registered"
      })
    }
    
    const newUser = await this.userRepo.create(createUserDto);
    return this.userRepo.save(newUser);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({
      id: id,
      email: updateUserDto.email
    })

    if(!user) {
      const user = await this.userRepo.findOne({
        email: updateUserDto.email
      })

      if(user) {
        throw new BadRequestException({
          message: "Email registered"
        })
      }
    }

    const newUser = await this.userRepo.preload({
      id,
      ...updateUserDto
    });

    if(!newUser) {
      throw new NotFoundException({
        message: "User notfound"
      });
    }
    
    return this.userRepo.save(newUser);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne(id);
    if(user) {
      throw new NotFoundException({
        message: "User notfound"
      });
    }
    return this.userRepo.remove(user);
  }
}
