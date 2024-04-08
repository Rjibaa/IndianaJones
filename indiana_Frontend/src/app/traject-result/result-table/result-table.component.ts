import { Component, Input, OnInit } from '@angular/core';
import { Train } from '../../model/train';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrl: './result-table.component.css',
})
export class ResultTableComponent {
  @Input() trains!: Train[];
  @Input() path!: string[];
  public isEmpty: Boolean = false;
}
