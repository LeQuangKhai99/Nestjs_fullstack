import { Calender } from './entities/calender.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CalendersService } from './calenders.service';
import { CalendersController } from './calenders.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Calender])
  ],
  controllers: [CalendersController],
  providers: [CalendersService]
})
export class CalendersModule {}
