import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HelperService } from '../service/helper.service';
import { Traject } from '../common/type/type';

@Component({
  selector: 'app-traject-inputs',
  templateUrl: './traject-inputs.component.html',
  styleUrl: './traject-inputs.component.css',
})
export class TrajectInputsComponent {
  @Output() trajectEvent: EventEmitter<Traject> = new EventEmitter<Traject>();

  public indianaTraject = {
    departureCity: '',
    arrivalCity: '',
    startTime: { hour: 0, minute: 0 },
  };

  constructor(public helperService: HelperService) {}

  onInput(value: string) {
    const startTimeInstring = this.helperService.formatTime(
      this.indianaTraject.startTime
    );
    const traject: Traject = {
      ...this.indianaTraject,
      startTime: startTimeInstring,
    };
    this.trajectEvent.emit(traject);
    const word = this.helperService.capitalizeFirstLettre(value);
    return word;
  }
}
