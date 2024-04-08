import { Module } from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainController } from './train.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Train } from './entities/train.entity';
import { DijkstraService } from 'src/dijkstra/dijkstra.service';

@Module({
  imports:[TypeOrmModule.forFeature([Train])],
  providers: [TrainService,DijkstraService],
  controllers: [TrainController]
})
export class TrainModule {}
