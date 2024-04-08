import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TrainService } from './train.service';
import { AddTrainDto } from './dto/add-train.dto';
import { GetTrajectDto } from './dto/get-traject.dto';

@Controller('train')
export class TrainController {
  constructor(private trainService: TrainService) {}

  @Get('all')
  getAllTrains() {
    return this.trainService.getAllTrains();
  }

  @Post('add')
  saveTrain(@Body() train: AddTrainDto) {
    return this.trainService.saveTrain(train);
  }

  @Post('bestTraject')
  getBestTraject(@Body() traject: GetTrajectDto) {
    const { departureCity, arrivalCity, startTime } = traject;
    const indianaTrains = this.trainService.getBestTraject(
      departureCity,
      arrivalCity,
      startTime,
    );
    return indianaTrains;
  }
}
