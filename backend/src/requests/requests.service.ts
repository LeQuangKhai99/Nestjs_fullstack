import { Injectable, Req, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import e from 'express';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepo:Repository<Request>
  ){}
  async create(createRequestDto: CreateRequestDto, @Req() req) {
    const start = new Date(createRequestDto.startAt);
    const end = new Date(createRequestDto.endAt);
    const now = new Date();
    
    if((start.getTime() - now.getTime()) < 0 && (createRequestDto.kind != '4')){
      throw new BadRequestException({"message": "Can't make a request for the past"});
    }

    if (createRequestDto.kind == '1') {

      const totalTimeOff = Math.abs(end.getTime() - start.getTime()) / 36e5;
      now.setHours(0, 0, 0, 0);
      start.setHours(0, 0, 0, 0);
      const diffDays = Math.abs(start.getTime() - now.getTime())/ (1000 * 60 * 60 * 24); 

      if(totalTimeOff <= 4) {
        if(diffDays < 1) {
          throw new BadRequestException({"message": "You need create request before one day"});
        }
      }
      else {
        if(totalTimeOff > 4 && totalTimeOff < 24) {
          if(diffDays < 2) {
            throw new BadRequestException({"message": "You need create request before two day"});
          }
        }
        else if(totalTimeOff >= 24 && totalTimeOff <= 48 ) {
          if(diffDays < 3) {
            throw new BadRequestException({"message": "You need create request before three day"});
          }
        }
        else if(totalTimeOff >= 48 && totalTimeOff <= 72 ) {
          if(diffDays < 5) {
            throw new BadRequestException({"message": "You need create request before five day"});
          }
        }
        else if(totalTimeOff >= 120) {
          throw new BadRequestException({"message": "You can't on leave 5 day consecutive"});
        }
        else {
          if(diffDays < 7) {
            throw new BadRequestException({"message": "You need create request before seven day"});
          }
        }
      }
      
    }
    else if (createRequestDto.kind == '2') {

      now.setHours(0, 0, 0, 0);
      const diffDays = Math.abs(start.getTime() - now.getTime())/ (1000 * 60 * 60 * 24); 
      if(diffDays < 1) {
        throw new BadRequestException({"message": "You need create request before 24 hours"});
      }
    }
    else if (createRequestDto.kind == '3') {
      
    }
    else if (createRequestDto.kind == '4') {
      if((now.getTime() - start.getTime()) < 0) {
        throw new BadRequestException({"message": "Can't make a request for the future"});
      }
      now.setHours(0, 0, 0, 0);
      start.setHours(0, 0, 0, 0);
      const diffDays = Math.abs(start.getTime() - now.getTime())/ (1000 * 60 * 60 * 24);

      if(diffDays > 7) {
        throw new BadRequestException({"message": "Request creation expired"});
      }
    }
    const request = await this.requestRepo.create({
      ...createRequestDto,
      userSend:req.user,
    });
    return this.requestRepo.save(request);
  }

  findAll() {
    return `This action returns all requests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} request`;
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return `This action updates a #${id} request`;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
