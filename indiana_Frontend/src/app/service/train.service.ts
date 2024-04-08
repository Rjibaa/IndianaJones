import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Train } from '../model/train';
import { Dijkstra, TrainInformation, Traject } from '../type/type';

@Injectable({
  providedIn: 'root',
})
export class TrainService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  public getTrains(): Observable<Train[]> {
    const url = `${this.baseUrl}/train/all`;
    return this.httpClient.get<Train[]>(url);
  }

  public addTrain(train: TrainInformation): Observable<Train> {
    const url = `${this.baseUrl}/train/add`;
    return this.httpClient.post<Train>(url, train);
  }

  public bestTraject(traject: Traject): Observable<Dijkstra> {
    const url = `${this.baseUrl}/train/bestTraject`;
    return this.httpClient.post<Dijkstra>(url, traject);
  }
}
