import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Roles } from './auth/decorators/roles.decorator';
import { Role } from './auth/enum/role.enum';
import { Public } from './common/decorators/public.decorator';

@ApiTags('Static')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }

  @Roles(Role.Admin)
  @Get('profile')
  prodile(@Req() req) {
    return req.user;
  }
}
