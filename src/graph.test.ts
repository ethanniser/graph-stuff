import { describe, it, expect } from "bun:test";
import { Graph, findCutVertices } from ".";

describe("Graph - Finding Cut Vertices", () => {
  it("should find cut vertices in a simple graph", () => {
    const graph = new Graph(
      new Map([
        [1, new Set([2, 3])],
        [2, new Set([1, 4])],
        [3, new Set([1, 5])],
        [4, new Set([2])],
        [5, new Set([3])],
      ])
    );

    const cutVertices = findCutVertices(graph);
    expect(cutVertices).toStrictEqual(new Set([1, 2, 3]));
  });

  it("should find cut vertices in a complex graph", () => {
    const graph = new Graph(
      new Map([
        [1, new Set([2, 3, 4, 6])],
        [2, new Set([1, 5, 7])],
        [3, new Set([1])],
        [4, new Set([1, 5])],
        [5, new Set([2, 4])],
        [6, new Set([1])],
        [7, new Set([2])],
      ])
    );

    const cutVertices = findCutVertices(graph);
    expect(cutVertices).toStrictEqual(new Set([1, 2]));
  });

  it("evan test", () => {
    const graph = new Graph(
      new Map([
        [0, new Set([1])],
        [1, new Set([0, 2, 3])],
        [2, new Set([1, 4])],
        [3, new Set([1, 4])],
        [4, new Set([2, 3, 5])],
        [5, new Set([4, 6])],
        [6, new Set([5])],
      ])
    );

    const cutVertices = findCutVertices(graph);
    expect(cutVertices).toStrictEqual(new Set([1, 4, 5]));
  });
});
