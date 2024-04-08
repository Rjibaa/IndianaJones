import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrajectInputsComponent } from './traject-inputs/traject-inputs.component';
import { TrainFormComponent } from './trains/train-form/train-form.component';
import { TrainTableComponent } from './trains/train-table/train-table.component';
import { TrainsComponent } from './trains/trains.component';
import { TrajectResultComponent } from './traject-result/traject-result.component';
import { ResultTableComponent } from './traject-result/result-table/result-table.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TrajectInputsComponent,
    TrainFormComponent,
    TrainTableComponent,
    TrainsComponent,
    TrajectResultComponent,
    ResultTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
