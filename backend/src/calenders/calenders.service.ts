import { User } from 'src/users/entities/user.entity';
import { Calender } from './entities/calender.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Req, BadRequestException } from '@nestjs/common';
import { CreateCalenderDto } from './dto/create-calender.dto';
import { UpdateCalenderDto } from './dto/update-calender.dto';
import { Between, Repository } from 'typeorm';

@Injectable()
export class CalendersService {
  constructor(
    @InjectRepository(Calender)
    private readonly calenderRepo: Repository<Calender>
  ) {}
  async checkIn(@Req() req) {
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const tomorow = new Date();
    tomorow.setDate(today.getDate());
    tomorow.setHours(23, 59, 59, 999);

    const calenderDto = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
      checkinAt: new Date(),
      user: req.user
    }

    const calender = await this.calenderRepo.findOne({
      where: {
        checkinAt: Between(today, tomorow),
        user: req.user
      }
    })

    if(calender) {
      throw new BadRequestException({message: 'you are checkedin'})
    }

    const newCalender = await this.calenderRepo.create(calenderDto);
    return this.calenderRepo.save(newCalender);
  }

  async checkOut(@Req() req) {
    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const tomorow = new Date();
    tomorow.setDate(today.getDate());
    tomorow.setHours(23, 59, 59, 999);

    const calender = await this.calenderRepo.findOne({
      where: {
        checkinAt: Between(today, tomorow),
        user: req.user
      }
    })

    if(!calender) {
      throw new BadRequestException({message: "you haven't checkin yet"})
    }

    const newCalender = await this.calenderRepo.preload({
      id: calender.id,
      checkoutAt: new Date()
    });
    return this.calenderRepo.save(newCalender);
  }

  findOne(id: number) {
    return `This action returns a #${id} calender`;
  }

  update(id: number, updateCalenderDto: UpdateCalenderDto) {
    return `This action updates a #${id} calender`;
  }

  remove(id: number) {
    return `This action removes a #${id} calender`;
  }
}
