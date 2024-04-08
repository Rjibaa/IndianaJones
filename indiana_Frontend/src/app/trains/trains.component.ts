import { Component, OnInit } from '@angular/core';
import { TrainService } from '../service/train.service';
import { Train } from '../model/train';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  styleUrl: './trains.component.css',
})
export class TrainsComponent implements OnInit {
  public trains: Train[] = [];
  public isEmpty!: boolean;

  constructor(public trainService: TrainService, public toast: ToastrService) {}

  ngOnInit(): void {
    //Make a request to the backend to get all trains.
    this.trainService.getTrains().subscribe(
      (response) => {
        const { statusCode, message, data } = response;
        if (statusCode === 200) {
          const result = data.result as Train[];
          this.trains = result;
          this.isEmpty = this.trains.length === 0;
        } else {
          this.toast.error(message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onTrainAdded(train: Train) {
    this.trains.push(train);
    this.isEmpty = false;
  }
}
