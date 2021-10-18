import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant/constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [AuthController],
  // nhan depen cua service khac
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule, 
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '30d'}
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
