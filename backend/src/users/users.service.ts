import { Department } from 'src/departments/entities/department.entity';
import { DepartmentsService } from './../departments/departments.service';
import { Calender } from './../calenders/entities/calender.entity';
import { ChangePasswordDto } from './dto/changepas-user.dto';
import { ResetPasswordDto } from './dto/reset-password-user.dto';
import { ActiveUserDto } from './dto/active-user.dto';
import { MailService } from './../mail/mail.service';
import { BadRequestException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as faker from 'faker';
import * as bcrypt from 'bcrypt';
import { Request } from 'src/requests/entities/request.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private mailService: MailService,
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>
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

    const userx = await this.userRepo.save(newUser);
    await this.mailService.sendUserConfirmation(userx, token);
    return userx;
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne(id);
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({
      where: [
        {
          email
        } 
      ],
      relations: ['role']
    });
  }

  async activeUser(activeUserDto: ActiveUserDto) {
    const user = await this.userRepo.findOne({
      id: activeUserDto.id,
      token: activeUserDto.token,
      email: activeUserDto.email
    });
    
    if(!user) {
      throw new NotFoundException({message: "Info error"})
    }

    if(user.active) {
      throw new BadRequestException({message: "Account actived"});
    }
    const exprired = new Date(user.tokenExpired);
    if(exprired.getTime() < Date.now()){
      throw new BadRequestException({message: "Authentication time has expired"})
    }

    const newUser = await this.userRepo.preload({
      id: +activeUserDto.id,
      active: true
    });
    return await this.userRepo.save(newUser);
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

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const token = await bcrypt.hash(`full-stack-token-${Date.now() + faker.random.words()}`, 10);
    resetPasswordDto.ids.forEach(async (id) => {
      const newUser = await this.userRepo.preload({
        id,
        password: await bcrypt.hash('abc', 10),
        token,
        changePass: false,
        active: false,
        tokenExpired: new Date(Date.now() + (1000 * 60 * 30))
      });
      if(newUser) {
        this.userRepo.save(newUser);
      }

      await this.mailService.sendUserResetPassword(newUser, token);
    })
    return {"message": "reset success"};
  }

  async changePassword(changePassword: ChangePasswordDto) {
    const {email, password, newPassword, confirmPassword} = changePassword;
    const user = await this.findByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      
      if(newPassword === confirmPassword) {
        let newUser = await this.userRepo.preload({
          id: user.id,
          password: await bcrypt.hash(confirmPassword, 10),
          changePass: true
        });

        this.userRepo.save(newUser);
        return {message: "Change pass success"}
      }
      throw new BadRequestException({message: "Confirm password not match with new password"});
    }
    throw new BadRequestException({message: "Username or password fail"});
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

  async employees(@Req() req) {
    const department = await this.departmentRepo.findOne({
      where: {
        manage: req.user
      }
    });

    if(!department) {
      throw new NotFoundException({"message": "You are not manager"})
    }

    return await this.userRepo.find({
      where: {
        department: department
      }
    });
  }
}
