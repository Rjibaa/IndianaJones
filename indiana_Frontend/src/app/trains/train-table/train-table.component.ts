import { Component, Input } from '@angular/core';
import { Train } from '../../model/train';

@Component({
  selector: 'app-train-table',
  templateUrl: './train-table.component.html',
  styleUrl: './train-table.component.css',
})
export class TrainTableComponent {
  @Input() trains!: Train[];

  public headers = [
    'Ville de départ',
    "Ville d'arrivée",
    'Heure de départ',
    'Durée de trajet',
  ];

  constructor() {}
}
