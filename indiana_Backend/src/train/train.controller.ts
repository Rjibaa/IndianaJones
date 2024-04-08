import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { TrainService } from './train.service';
import { AddTrainDto } from './dto/add-train.dto';
import { GetTrajectDto } from './dto/get-traject.dto';
import { HttpExceptionFilter } from 'src/commun/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from 'src/commun/interceptor/interceptor/transform.interceptor';

@Controller('train')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(TransformInterceptor)
export class TrainController {
  constructor(private trainService: TrainService) {}

  @Get('all')
  async getAllTrains() {
    const trains = await this.trainService.getAllTrains();
    return { message: 'All trains', result: trains };
  }

  @Post('add')
  async saveTrain(@Body() train: AddTrainDto) {
    const savedTrain = await this.trainService.saveTrain(train);
    return { message: 'New train added', result: savedTrain };
  }

  @Post('indianaTraject')
  async getBestTraject(@Body() traject: GetTrajectDto) {
    const { departureCity, arrivalCity, startTime } = traject;
    const indianaTrain = await this.trainService.getBestTraject(
      departureCity,
      arrivalCity,
      startTime,
    );
    return { message: 'Indiana Jones Trains', result: indianaTrain };
  }
}
