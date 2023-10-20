import { describe, it, expect } from "bun:test";
import { Graph, Tree, findCutVertices, findDiameter, findInducedSubgraph, hasTriangle } from ".";

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
  it("super basic", () => {
    const graph = new Graph();
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);


    const tree = new Tree(graph, 1);

    const diameter = findDiameter(tree);
    expect(diameter).toBe(1);
  });
  it("basic", () => {
    const graph = new Graph();
    graph.addEdge(1, 2);
    graph.addEdge(2, 3);
    graph.addEdge(2, 4);
    graph.addEdge(1, 5);
    graph.addEdge(5, 6);
    graph.addEdge(6, 7);
    graph.addEdge(6, 8);
    graph.addEdge(5, 9);

    const tree = new Tree(graph, 1);

    const diameter = findDiameter(tree);
    expect(diameter).toBe(4);
  });
  it("line", () => {
    const graph = new Graph();
    graph.addEdge(1, 2);
    graph.addEdge(2, 3);
    graph.addEdge(3, 4);

    const tree = new Tree(graph, 1);
    const diameter = findDiameter(tree);
    expect(diameter).toBe(2);
  })
  it("subtree higher", () => {
    const graph = new Graph();
    graph.addEdge(1, 2);
    graph.addEdge(2, 3);
    graph.addEdge(3, 4);
    graph.addEdge(4, 5);
    graph.addEdge(5, 6);
    graph.addEdge(2, 7);
    graph.addEdge(7, 8);
    graph.addEdge(8, 9);
    graph.addEdge(9, 10);
    graph.addEdge(1, 11);
    graph.addEdge(11, 12);

    const tree = new Tree(graph, 1);

    const diameter = findDiameter(tree);
    expect(diameter).toBe(7);
  });
});

describe("induced subgraph", () => {
  it("basic", () => {
    const graph = new Graph();
    graph.addEdge(1, 2);
    graph.addEdge(2, 3);
    graph.addEdge(3, 4);
    graph.addEdge(3, 5);
    graph.addEdge(4, 5);
    graph.addEdge(5, 1);
    graph.addEdge(3, 6);
    graph.addEdge(3, 7);
    graph.addEdge(6, 7);
    graph.addEdge(6, 4);
    graph.addEdge(7, 4);

    const expectedThreeSubgraph = new Graph();
    expectedThreeSubgraph.addEdge(3, 4);
    expectedThreeSubgraph.addEdge(3, 6);
    expectedThreeSubgraph.addEdge(3, 7);
    expectedThreeSubgraph.addEdge(4, 6);
    expectedThreeSubgraph.addEdge(4, 7);
    expectedThreeSubgraph.addEdge(6, 7);

    // const resultTwo = findInducedSubgraph(graph, 2);
    // expect(resultTwo.found).toBeTrue();
    // expect(resultTwo.graph).toStrictEqual(resultTwo.graph);

    const resultThree = findInducedSubgraph(graph, 3);
    expect(resultThree.found).toBeTrue();
    expect(resultThree.graph).toStrictEqual(expectedThreeSubgraph);

    // const resultFour = findInducedSubgraph(graph, 4);
    // expect(resultFour.found).toBeFalse();
    
  })
  it("disconnected solution", () => {
    const graph = new Graph();
    graph.addEdge(1, 2);
    // 'section 1'
    graph.addEdge(2, 3);
    graph.addEdge(2, 4);
    graph.addEdge(2, 5);
    graph.addEdge(3, 4);
    graph.addEdge(3, 5);
    graph.addEdge(4, 5);

    graph.addEdge(1, 6);
    // 'section 2'
    graph.addEdge(6, 7);
    graph.addEdge(6, 8);
    graph.addEdge(6, 9);
    graph.addEdge(7, 8);
    graph.addEdge(7, 9);
    graph.addEdge(8, 9);

    const expectedThreeSubgraph = new Graph();
    expectedThreeSubgraph.addEdge(2, 3);
    expectedThreeSubgraph.addEdge(2, 4);
    expectedThreeSubgraph.addEdge(2, 5);
    expectedThreeSubgraph.addEdge(3, 4);
    expectedThreeSubgraph.addEdge(3, 5);
    expectedThreeSubgraph.addEdge(4, 5);
    expectedThreeSubgraph.addEdge(6, 7);
    expectedThreeSubgraph.addEdge(6, 8);
    expectedThreeSubgraph.addEdge(6, 9);
    expectedThreeSubgraph.addEdge(7, 8);
    expectedThreeSubgraph.addEdge(7, 9);
    expectedThreeSubgraph.addEdge(8, 9);

    const resultThree = findInducedSubgraph(graph, 3);
    expect(resultThree.found).toBeTrue();
    expect(resultThree.graph).toStrictEqual(expectedThreeSubgraph);
  })
})