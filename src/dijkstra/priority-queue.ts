/**
 * Priority queue implementation to use it in Dijkstra algorithm.
 */

export class PriorityQueue {
    elements: [number, string][];

    constructor() {
        this.elements = [];
    }

    enqueue(priority: number, element: string) {
        this.elements.push([priority, element]);
        this.elements.sort((a, b) => a[0] - b[0]);
    }

    dequeue() {
        return this.elements.shift();
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}