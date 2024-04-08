import { Train } from 'src/train/entities/train.entity';

export type Dijkstra = {
  path: string[];
  indianaTrain: Train[];
};

export type responseMessage = {
  statusCode: number;
  message: string;
  data: {};
};
