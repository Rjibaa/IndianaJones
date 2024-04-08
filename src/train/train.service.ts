import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Train } from './entities/train.entity';
import { Repository } from 'typeorm';
import { DijkstraService } from 'src/dijkstra/dijkstra.service';
import { AddTrainDto } from './dto/add-train.dto';
import { Dijkstra } from 'src/helper/type';

@Injectable()
export class TrainService {
    constructor(
        @InjectRepository(Train)
        private trainRepository : Repository<Train>,
        private dijkstraService : DijkstraService
    ){}

    //Function to save new trains
    saveTrain(trainData:AddTrainDto){
        try{
            const train = this.trainRepository.create(trainData)
            console.log(train)
            return this.trainRepository.save(train)
        }catch(error){
            return error.message
        }
    }

    //Function to get all trains
    getAllTrains():Promise<Train[]>{
        try{
            return this.trainRepository.find();
        }catch(error){
            return error.message
        }
    }

    //Function to get all trains that the departureTime is greater than the startTime
    async findTrainsWithDepartureTimeAfter(startTime: string): Promise<Train[]> {
        try{
            const [startHour, startMinute] = startTime.split(':').map(Number);
    
            return await this.trainRepository
            .createQueryBuilder('train')
            .where('HOUR(train.departureTime) > :hour', { hour: startHour })
            .orWhere('(HOUR(train.departureTime) = :hour AND MINUTE(train.departureTime) >= :minute)', { hour: startHour, minute: startMinute })
            .getMany();

        }catch(error){
            return error.message
        }
    }

    // Function to find the best traject based on Dijkstra algorithme
    async getBestTraject(departureCity:string,arrivalCity:string,startTime:string):Promise<Dijkstra>{
        try{
            const trains = await this.findTrainsWithDepartureTimeAfter(startTime);
            const dijikstraResult = this.dijkstraService.findShortestPath(trains,departureCity,arrivalCity,startTime);
            return dijikstraResult
        }catch(error){
            return error.message
        }
    }

    
}
