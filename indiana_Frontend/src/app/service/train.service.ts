import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseType, TrainInformation, Traject } from '../common/type/type';

@Injectable({
  providedIn: 'root',
})
export class TrainService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  //Function to make request to get all trains
  public getTrains(): Observable<ResponseType> {
    const url = `${this.baseUrl}/train/all`;
    return this.httpClient.get<ResponseType>(url);
  }

  //Function to make request to post new train
  public addTrain(train: TrainInformation): Observable<ResponseType> {
    const url = `${this.baseUrl}/train/add`;
    return this.httpClient.post<ResponseType>(url, train);
  }

  //Function to make request to get the best traject
  public indianaTraject(traject: Traject): Observable<ResponseType> {
    const url = `${this.baseUrl}/train/indianaTraject`;
    return this.httpClient.post<ResponseType>(url, traject);
  }
}
