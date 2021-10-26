import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CalendersService } from './calenders.service';
import { CreateCalenderDto } from './dto/create-calender.dto';
import { UpdateCalenderDto } from './dto/update-calender.dto';

@ApiTags('Calenders')
@Controller('calenders')
export class CalendersController {
  constructor(private readonly calendersService: CalendersService) {}

  @Post('check-in')
  checkIn(@Req() req) {
    return this.calendersService.checkIn(req);
  }

  @Patch('check-out')
  checkOut(@Req() req) {
    return this.calendersService.checkOut(req);
  }
}
