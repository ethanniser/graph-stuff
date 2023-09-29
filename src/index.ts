export class Graph<T> {
  private adjacencyList: Map<T, Set<T>>;

  constructor() {
    this.adjacencyList = new Map<T, Set<T>>();
  }

  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, new Set<T>());
    }
  }

  addEdge(from: T, to: T): void {
    this.addVertex(from);
    this.addVertex(to);

    this.adjacencyList.get(from)!.add(to);
    this.adjacencyList.get(to)!.add(from); // Uncomment this line for an undirected graph
  }

  loadFromAdjacencyList(adjacencyList: Map<T, Set<T>>): void {
    this.adjacencyList = adjacencyList;
  }

  toAdjacencyList(): Map<T, Set<T>> {
    return this.adjacencyList;
  }

  removeVertex(vertex: T): void {
    this.adjacencyList.delete(vertex);
    for (const vertices of this.adjacencyList.values()) {
      vertices.delete(vertex);
    }
  }

  removeEdge(from: T, to: T): void {
    const fromNeighbors = this.adjacencyList.get(from);
    const toNeighbors = this.adjacencyList.get(to);

    if (fromNeighbors && toNeighbors) {
      fromNeighbors.delete(to);
      toNeighbors.delete(from);
    }
  }

  getNeighbors(vertex: T): Set<T> {
    return this.adjacencyList.get(vertex) || new Set<T>();
  }

  getVertices(): T[] {
    return [...this.adjacencyList.keys()];
  }

  getDegree(vertex: T): number {
    return this.getNeighbors(vertex).size;
  }

  size(): number {
    return this.adjacencyList.size;
  }

  isEmpty(): boolean {
    return this.adjacencyList.size === 0;
  }

  contains(vertex: T): boolean {
    return this.adjacencyList.has(vertex);
  }

  hasEdge(from: T, to: T): boolean {
    const fromNeighbors = this.adjacencyList.get(from);
    const toNeighbors = this.adjacencyList.get(to);

    return (
      !!fromNeighbors &&
      !!toNeighbors &&
      fromNeighbors.has(to) &&
      toNeighbors.has(from)
    );
  }
}


export function findCutVertices<T>(graph: Graph<T>): Set<T> {
  const cutVertices = new Set<T>();
  let time = 0;

  const visited = new Set<T>();
  const timeIn = new Map<T, number>();
  const lowTime = new Map<T, number>();

  const dfs = (current: T, parent: T | null) => {
    visited.add(current);
    timeIn.set(current, time);
    lowTime.set(current, time);
    time++;

    const neighbors = graph.getNeighbors(current);
    let childCount = 0;

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        childCount++;
        dfs(neighbor, current);
        lowTime.set(
          current,
          Math.min(lowTime.get(current)!, lowTime.get(neighbor)!)
        );

        if (lowTime.get(neighbor)! >= timeIn.get(current)!) {
          if (parent !== null || childCount > 1) {
            cutVertices.add(current);
          }
        }
      } else if (neighbor !== parent) {
        lowTime.set(
          current,
          Math.min(lowTime.get(current)!, timeIn.get(neighbor)!)
        );
      }
    }
  };

  for (const vertex of graph.getVertices()) {
    if (!visited.has(vertex)) {
      dfs(vertex, null);
    }
  }

  return cutVertices;
}





