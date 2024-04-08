import { Injectable } from '@nestjs/common';
import { Train } from 'src/train/entities/train.entity';
import { PriorityQueue } from './priority-queue';
import {
  calculateArrivalTime,
  formatTime,
  parseTime,
} from 'src/commun/helper/helper';
import { Dijkstra } from 'src/commun/type/type';

@Injectable()
export class DijkstraService {
  constructor() {}

  // Function to create the graph based on the trains data
  createGraph(trains: Train[]) {
    const graph: { [city: string]: { [destination: string]: number } } = {};
    for (const train of trains) {
      graph[train.departureCity] = graph[train.departureCity] || {};
      graph[train.departureCity][train.arrivalCity] = calculateArrivalTime(
        train.departureTime,
        train.travelTime,
      );
    }
    return graph;
  }

  // Function to find the shortest path using Dijkstra's algorithm
  findShortestPath(
    trains: Train[],
    departureCity: string,
    arrivalCity: string,
    startTime: string,
  ): Dijkstra {
    const nodesCostFromStart: { [node: string]: number } = {};
    const pq = new PriorityQueue();
    const path: string[] = [];
    const prevNodes = {};
    const graph = this.createGraph(trains);
    const indianaTrain: Train[] = [];

    // Put infinity cost to all cities except the departure City and previous nodes for all cities
    for (const node in graph) {
      nodesCostFromStart[node] = Infinity;
      prevNodes[node] = null;
    }
    nodesCostFromStart[departureCity] = parseTime(startTime);
    pq.enqueue(parseTime(startTime), departureCity);

    // Implementation of Dijkstra's algorithm
    while (!pq.isEmpty()) {
      const [currentTime, currentNode] = pq.dequeue()!;
      if (currentNode === arrivalCity) {
        let node = arrivalCity;
        //Construct Indiana trains
        while (prevNodes[node]) {
          const train = trains.find(
            (train) =>
              train.departureCity === prevNodes[node] &&
              train.arrivalCity === node &&
              calculateArrivalTime(train.departureTime, train.travelTime) ===
                nodesCostFromStart[node],
          );
          if (train) {
            indianaTrain.unshift(train);
          }
          node = prevNodes[node];
        }
        break;
      }

      //Update costs and previous nodes for neighbors
      for (const neighbor in graph[currentNode]) {
        const newCost = graph[currentNode][neighbor];
        //See departure Time compatiblity with the previous train
        const departureTimeCompatible = trains.some(
          (train) =>
            train.departureCity === currentNode &&
            train.arrivalCity === neighbor &&
            parseTime(train.departureTime) >= currentTime,
        );
        //If the departure Time is compatible, we explore the node else we pass
        if (departureTimeCompatible) {
          if (!nodesCostFromStart[neighbor] && neighbor === arrivalCity) {
            prevNodes[arrivalCity] = currentNode;
            nodesCostFromStart[arrivalCity] = newCost;
            pq.enqueue(newCost, arrivalCity);
          }
          if (newCost < nodesCostFromStart[neighbor]) {
            nodesCostFromStart[neighbor] = newCost;
            prevNodes[neighbor] = currentNode;
            pq.enqueue(newCost, neighbor);
          }
        }
      }
    }
    // Construct the path details
    if (indianaTrain.length === 0) {
      const pathInformation = `There is no Trains from ${departureCity} to ${arrivalCity} today`;
      path.push(pathInformation);
    } else {
      indianaTrain.map((train) => {
        const { departureCity, arrivalCity, departureTime, travelTime } = train;
        const arrivalTime = calculateArrivalTime(departureTime, travelTime);
        const pathInformation = `Prendre le ${departureCity}-${arrivalCity} de ${departureTime}, arrivée à ${formatTime(arrivalTime)}`;
        path.push(pathInformation);
      });
    }

    return { path, indianaTrain };
  }
}
