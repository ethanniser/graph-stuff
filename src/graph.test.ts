import { describe, it, expect } from "bun:test";
import { Graph, findCutVertices, findDiameter, hasTriangle } from ".";

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

  it("evan test 2", () => {
    const graph = new Graph(
      new Map([
        [0, new Set([1])],
        [1, new Set([0, 2, 3])],
        [2, new Set([1, 4])],
        [3, new Set([1, 4])],
        [4, new Set([2, 3, 5])],
        [5, new Set([4, 6])],
        [6, new Set([5])],
        [7, new Set([8])],
        [8, new Set([7])],
        [9, new Set([])],
        [10, new Set([11])],
        [11, new Set([10, 12])],
        [12, new Set([11])],
      ])
    );

    const cutVertices = findCutVertices(graph);
    expect(cutVertices).toStrictEqual(new Set([1, 4, 5, 11]));
  });
});

describe("finding triangles", () => {
  it("basic triangle", () => {
    const graph = new Graph(
      new Map([
        [1, new Set([2, 3])],
        [2, new Set([1, 3])],
        [3, new Set([1, 2])],
      ])
    );

    const result = hasTriangle(graph);
    expect(result).toBeTrue();
  });

  it("multiple triangles", () => {
    const graph = new Graph(
      new Map([
        [1, new Set([2, 3])],
        [2, new Set([1, 3, 4])],
        [3, new Set([1, 2, 4])],
        [4, new Set([2, 3, 5])],
        [5, new Set([4, 6])],
        [6, new Set([5, 7])],
        [7, new Set([6])],
      ])
    );

    const result = hasTriangle(graph);
    expect(result).toBeTrue();
  });

  it("no triangles", () => {
    const graph = new Graph(
      new Map([
        [1, new Set([2])],
        [2, new Set([1])],
        [3, new Set([4])],
        [4, new Set([3])],
      ])
    );

    const result = hasTriangle(graph);
    expect(result).toBeFalse();
  });
});

describe("diameter of tree", () => {
  it("basic", () => {
    const tree = new Graph();
    tree.addEdge(1, 2);
    tree.addEdge(2, 3);
    tree.addEdge(2, 4);
    tree.addEdge(1, 5);
    tree.addEdge(5, 6);
    tree.addEdge(6, 7);
    tree.addEdge(6, 8);
    tree.addEdge(5, 9);

    const diameter = findDiameter(tree);
    expect(diameter).toBe(4);
  });
  it("subtree higher", () => {
    const tree = new Graph();
    tree.addEdge(1, 2);
    tree.addEdge(2, 3);
    tree.addEdge(3, 4);
    tree.addEdge(4, 5);
    tree.addEdge(5, 6);
    tree.addEdge(2, 7);
    tree.addEdge(7, 8);
    tree.addEdge(8, 9);
    tree.addEdge(1, 10);
    tree.addEdge(10, 11);

    const diameter = findDiameter(tree);
    expect(diameter).toBe(8);
  });
});
