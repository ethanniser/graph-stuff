export class Graph {
  private adjacencyList: Map<number, Set<number>>;

  constructor(adjacencyList?: Map<number, Set<number>>) {
    this.adjacencyList = adjacencyList ?? new Map<number, Set<number>>();
  }

  addVertex(vertex: number): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, new Set<number>());
    }
  }

  addEdge(from: number, to: number): void {
    this.addVertex(from);
    this.addVertex(to);

    this.adjacencyList.get(from)!.add(to);
    this.adjacencyList.get(to)!.add(from);
  }

  getAdjacencyList(): Readonly<Map<number, Set<number>>> {
    return this.adjacencyList;
  }

  removeVertex(vertex: number): void {
    this.adjacencyList.delete(vertex);
    for (const vertices of this.adjacencyList.values()) {
      vertices.delete(vertex);
    }
  }

  removeEdge(from: number, to: number): void {
    const fromNeighbors = this.adjacencyList.get(from);
    const toNeighbors = this.adjacencyList.get(to);

    if (fromNeighbors && toNeighbors) {
      fromNeighbors.delete(to);
      toNeighbors.delete(from);
    }
  }

  getNeighbors(vertex: number): Set<number> {
    return this.adjacencyList.get(vertex) || new Set<number>();
  }

  getVertices(): number[] {
    return [...this.adjacencyList.keys()];
  }

  getDegree(vertex: number): number {
    return this.getNeighbors(vertex).size;
  }

  size(): number {
    return this.adjacencyList.size;
  }

  isEmpty(): boolean {
    return this.adjacencyList.size === 0;
  }

  contains(vertex: number): boolean {
    return this.adjacencyList.has(vertex);
  }

  hasEdge(from: number, to: number): boolean {
    const fromNeighbors = this.adjacencyList.get(from);
    const toNeighbors = this.adjacencyList.get(to);

    return (
      !!fromNeighbors &&
      !!toNeighbors &&
      fromNeighbors.has(to) &&
      toNeighbors.has(from)
    );
  }

  copy(): Graph {
    const newGraph = new Graph();

    for (const [key, value] of this.adjacencyList) {
      newGraph.adjacencyList.set(key, new Set(value));
    }

    return newGraph;
  }
}

export function findCutVertices(graph: Graph): Set<number> {
  const cutVertices = new Set<number>();
  let time = 0;

  const visited = new Set<number>();
  const timeIn = new Map<number, number>();
  const lownumberime = new Map<number, number>();

  const dfs = (current: number, parent: number | null) => {
    visited.add(current);
    timeIn.set(current, time);
    lownumberime.set(current, time);
    time++;

    const neighbors = graph.getNeighbors(current);
    let childCount = 0;

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        childCount++;
        dfs(neighbor, current);
        lownumberime.set(
          current,
          Math.min(lownumberime.get(current)!, lownumberime.get(neighbor)!)
        );

        if (lownumberime.get(neighbor)! >= timeIn.get(current)!) {
          if (parent !== null || childCount > 1) {
            cutVertices.add(current);
          }
        }
      } else if (neighbor !== parent) {
        lownumberime.set(
          current,
          Math.min(lownumberime.get(current)!, timeIn.get(neighbor)!)
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

function createEdgeList(graph: Graph): Set<[number, number]> {
  const edgeList = new Set<[number, number]>();

  for (const [key, value] of graph.getAdjacencyList()) {
    for (const edge of value) {
      edgeList.add([key, edge]);
    }
  }

  return edgeList;
}

export function hasTriangle(graph: Graph): boolean {
  const vertices = graph.getVertices();
  const edges = createEdgeList(graph);

  for (const vertex of vertices) {
    for (const edge of edges) {
      if (graph.hasEdge(vertex, edge[0]) && graph.hasEdge(vertex, edge[1])) {
        return true;
      }
    }
  }

  return false;
}

export class Tree {
  constructor(public graph: Graph, public root: number) {}
}

export function findDiameter(tree: Tree): number {
  const visited = new Set<number>();

  function dfs(
    current: number
  ): Readonly<[maxDepth: number, maxDiameter: number | null]> {
    console.log("VISITING", current);

    visited.add(current);
    const children = Array.from(tree.graph.getNeighbors(current)).filter(
      (child) => !visited.has(child)
    );
    if (children.length === 0) {
      console.log("LEAF", current);
      return [0, null];
    }
    const childrenResults = children.map((child) => dfs(child));

    if (childrenResults.length === 1) {
      const depth = childrenResults[0][0] + 1;
      const result = [depth, null] as const;
      console.log("SINGLE CHILD", current, result);
      return result;
    }

    console.log("CHILDREN", current, children, childrenResults);
    const childDiameters = childrenResults
      .map((childResult) => childResult[1])
      .filter(Boolean);
    const childDepths = childrenResults.map((childResult) => childResult[0]);

    const tempMaxChildDiameter = Math.max(...childDiameters);
    const maxChildDiameter =
      tempMaxChildDiameter === -Infinity ? null : tempMaxChildDiameter;

    const sortedDepths = childDepths.sort((a, b) => b - a);
    const highestDepth = sortedDepths[0];
    const bestDiameter = sortedDepths[0] + sortedDepths[1] + 2;

    const result = [
      highestDepth + 1,
      Math.max(maxChildDiameter ?? 0, bestDiameter),
    ] as const;
    console.log("RESULT", current, result);
    return result;
  }

  const result = dfs(tree.root);

  return Math.max(result[0], result[1] ?? 0) - 1;
}

type IdkReturn =
  | {
      found: true;
      graph: Graph;
    }
  | {
      found: false;
      graph: undefined;
    };

export function findInducedSubgraph(graph: Graph, k: number): IdkReturn {
  const visited = new Set<number>();
  const markedForDeletion = new Set<number>();
  function dfs(node: number): boolean {
    visited.add(node);

    let degree = graph.getDegree(node);

    Array.from(graph.getNeighbors(node))
      .filter((neighbor) => !visited.has(neighbor))
      .filter((neighbor) => !markedForDeletion.has(neighbor))
      .map((neighbor) => {
        if (dfs(neighbor)) {
          degree--;
        }
      });

    if (degree < k) {
      markedForDeletion.add(node);
      return true;
    } else {
      return false;
    }
  }

  for (const vertex of graph.getVertices()) {
    if (!visited.has(vertex)) {
      dfs(vertex);
    }
  }

  const newGraph = graph.copy();
  for (const vertex of markedForDeletion) {
    newGraph.removeVertex(vertex);
  }
  if (newGraph.size() === 0) {
    return { found: false, graph: undefined };
  } else {
    return { found: true, graph: newGraph };
  }
}
