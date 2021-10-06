import { Injectable } from '@nestjs/common';
import { CreateCalenderDto } from './dto/create-calender.dto';
import { UpdateCalenderDto } from './dto/update-calender.dto';

@Injectable()
export class CalendersService {
  create(createCalenderDto: CreateCalenderDto) {
    return 'This action adds a new calender';
  }

  findAll() {
    return `This action returns all calenders`;
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
