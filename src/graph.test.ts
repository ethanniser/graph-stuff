import { describe, it, expect } from "bun:test";
import { Graph, findCutVertices } from ".";

describe("Graph - Finding Cut Vertices", () => {
  it("should find cut vertices in a simple graph", () => {
    const graph = new Graph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(2, 4);
    graph.addEdge(3, 5);

    const cutVertices = findCutVertices(graph);
    expect(cutVertices).toStrictEqual(new Set([1, 2, 3]));
  });

  it("should find cut vertices in a complex graph", () => {
    const graph = new Graph<number>();
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(1, 4);
    graph.addEdge(2, 5);
    graph.addEdge(4, 5);
    graph.addEdge(2, 7);
    graph.addEdge(1, 6);

    const cutVertices = findCutVertices(graph);
    expect(cutVertices).toStrictEqual(new Set([1, 2]));
  });
});
