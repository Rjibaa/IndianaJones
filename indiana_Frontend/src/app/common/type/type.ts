import { Train } from '../../model/train';

export type TrainInformation = {
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  travelTime: string;
};

export type Traject = {
  departureCity: string;
  arrivalCity: string;
  startTime: string;
};

export type Dijkstra = {
  path: string[];
  indianaTrain: Train[];
};

export type ResponseType = {
  statusCode: number;
  message: string;
  data: { result: {} };
};
