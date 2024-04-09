import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HelperService } from '../../service/helper.service';
import { TrainService } from '../../service/train.service';
import { ToastrService } from 'ngx-toastr';
import { Train } from '../../model/train';
import { TrainInformation } from '../../common/type/type';

@Component({
  selector: 'app-train-form',
  templateUrl: './train-form.component.html',
  styleUrl: './train-form.component.css',
})
export class TrainFormComponent {
  @Output() trainAdded: EventEmitter<Train> = new EventEmitter<Train>();

  public train = {
    departureCity: '',
    arrivalCity: '',
    departureTime: { hour: 0, minute: 0 },
    travelTime: { hour: 0, minute: 0 },
  };

  constructor(
    public helperService: HelperService,
    private trainService: TrainService,
    private toastr: ToastrService
  ) {}

  onSubmit(form: NgForm) {
    const { departureTime, travelTime } = this.train;
    //format Time to be a string in this format : HH:MM
    const departureTimeInstring = this.helperService.formatTime(departureTime);
    const travelTimeInstring = this.helperService.formatTime(travelTime);

    const newTrain: TrainInformation = {
      ...this.train,
      departureTime: departureTimeInstring,
      travelTime: travelTimeInstring,
    };

    //Make a request to the backend to add train to the database.
    this.trainService.addTrain(newTrain).subscribe(
      (response) => {
        const { statusCode, message, data } = response;
        const result = data.result as Train;
        if (statusCode === 201) {
          form.resetForm();
          this.trainAdded.emit(result);
          this.toastr.success('Train ajouté avec succées');
        } else {
          this.toastr.error(message);
        }
      },
      (error) => {
        this.toastr.error(error.message);
      }
    );
  }
}
