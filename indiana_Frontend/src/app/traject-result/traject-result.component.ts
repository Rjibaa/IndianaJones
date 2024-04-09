import { Component, Input } from '@angular/core';
import { TrainService } from '../service/train.service';
import { Train } from '../model/train';
import { Dijkstra, Traject } from '../common/type/type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-traject-result',
  templateUrl: './traject-result.component.html',
  styleUrl: './traject-result.component.css',
})
export class TrajectResultComponent {
  @Input() indianaTraject!: Traject;

  public trains: Train[] = [];
  public path: string[] = [];
  public isEmpty: boolean = true;

  constructor(
    private trainService: TrainService,
    private toastr: ToastrService
  ) {}

  onClick() {
    // Check if Traject inputs are filled
    if (this.indianaTraject) {
      const { departureCity, arrivalCity } = this.indianaTraject;
      // Inputs traject verification
      if (
        !departureCity ||
        !arrivalCity ||
        departureCity.length <= 4 ||
        arrivalCity.length <= 4
      ) {
        this.toastr.error(
          'Indiana you need to put a departure and arrival cities correctly'
        );
      } else {
        // Make a request to the backend to find the best traject based on the provided Indiana traject.
        this.trainService.indianaTraject(this.indianaTraject).subscribe(
          (response) => {
            const { statusCode, message, data } = response;
            console.log(response);
            if (statusCode === 201) {
              const result = data.result as Dijkstra;
              const { path, indianaTrain } = result;
              this.path = path;
              this.trains = indianaTrain;
              this.isEmpty = this.trains.length === 0;
            } else {
              this.toastr.error(message);
            }
          },
          (error) => {
            this.toastr.error(error.message);
          }
        );
      }
    } else {
      this.toastr.error(
        'Indiana you need to put a departure and arrival cities'
      );
    }
  }
}
