import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HelperService } from '../../service/helper.service';
import { TrainService } from '../../service/train.service';
import { ToastrService } from 'ngx-toastr';
import { Train } from '../../model/train';
import { TrainInformation } from '../../type/type';

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
    const departureTimeInstring = this.helperService.formatTime(departureTime);
    const travelTimeInstring = this.helperService.formatTime(travelTime);

    const newTrain: TrainInformation = {
      ...this.train,
      departureTime: departureTimeInstring,
      travelTime: travelTimeInstring,
    };

    this.trainService.addTrain(newTrain).subscribe(
      (response) => {
        this.toastr.success('Train ajouté avec succées');
        form.resetForm();
        this.trainAdded.emit(response);
      },
      (error) => {
        this.toastr.error(error.message);
      }
    );
  }
}
