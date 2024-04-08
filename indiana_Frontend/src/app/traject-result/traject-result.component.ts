import { Component, Input } from '@angular/core';
import { TrainService } from '../service/train.service';
import { Train } from '../model/train';
import { Traject } from '../type/type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-traject-result',
  templateUrl: './traject-result.component.html',
  styleUrl: './traject-result.component.css',
})
export class TrajectResultComponent {
  @Input() indianaTraject!: Traject;
  public trains: Train[] = [];
  public path: string[] = [
    'Indiana Jones put your traject Information and we will find the best traject for you',
  ];

  constructor(
    private trainService: TrainService,
    private toastr: ToastrService
  ) {}

  onClick() {
    const { departureCity, arrivalCity } = this.indianaTraject;
    if (!departureCity || !arrivalCity) {
      this.toastr.error(
        'Indiana you need to put a departure and arrival cities'
      );
    } else {
      this.trainService.bestTraject(this.indianaTraject).subscribe(
        (result) => {
          const { path, indianaTrain } = result;
          this.path = path;
          this.trains = indianaTrain;
        },
        (error) => {
          this.toastr.error(error.message);
        }
      );
    }
  }
}
