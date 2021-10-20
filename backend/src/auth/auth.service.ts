import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    if(!user.active) {
      throw new UnauthorizedException({message: "Account unactive"})
    }

    if(!user.changePass) {
      throw new UnauthorizedException({message: "Please change password first"});
    }
    const {password, ...userInfo} = user;
    return {
      access_token: this.jwtService.sign(userInfo),
    };
  }
}
