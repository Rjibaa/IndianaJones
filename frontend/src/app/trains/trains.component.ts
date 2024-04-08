import { Component, OnInit } from '@angular/core';
import { TrainService } from '../service/train.service';
import { Train } from '../model/train';

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  styleUrl: './trains.component.css',
})
export class TrainsComponent implements OnInit {
  public trains: Train[] = [];

  constructor(public trainService: TrainService) {}

  ngOnInit(): void {
    this.trainService.getTrains().subscribe(
      (response) => {
        this.trains = response;
        console.log(this.trains);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onTrainAdded(train: Train) {
    this.trains.push(train);
  }
}
