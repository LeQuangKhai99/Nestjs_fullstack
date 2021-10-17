import { MailService } from './../mail/mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as faker from 'faker';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private mailService: MailService
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
    
    const token = await bcrypt.hash(`full-stack-token-${createUserDto.email}`, 10);
    const newDto = {
      ...createUserDto,
      password: await bcrypt.hash('abc', 10),
      avatar: faker.image.avatar(),
      active: false,
      token: token,
      tokenExpired: new Date(Date.now() + (1000 * 60 * 30))
    }
    const newUser = await this.userRepo.create(newDto);

    await this.mailService.sendUserConfirmation(newUser, token);
    return this.userRepo.save(newUser);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne(id);
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({
      where: [
        {
          email
        } 
      ],
      relations: ['role']
    });
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
