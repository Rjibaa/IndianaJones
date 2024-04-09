import { Component } from '@angular/core';
import { Traject } from './common/type/type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public indianaTraject!: Traject;

  onChangeInput(traject: Traject) {
    this.indianaTraject = traject;
  }
}
