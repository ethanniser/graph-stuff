# Triangle Writeup
*Ethan Niser*

## [5] Consider the problem of determining whether a given undirected graph `G = (V, E)` contains a *triangle* or cycle of length 3.

### (a) Give an `O(|V|^3)` to find a triangle if one exists.

A brute force solution would involve checking all possible combinations of three vertices in the graph to see if they form a triangle. This can be done by nested loops that iterate over all possible triples of vertices.

```python
def has_triangle(G):
    for v1 in G.vertices:
        for v2 in G.vertices:
            if v1 != v2:
                for v3 in G.vertices:
                    if v3 != v1 and v3 != v2:
                        if G.has_edge(v1, v2) and G.has_edge(v2, v3) and G.has_edge(v3, v1):
                            return True
    return False
```
This code checks all possible combinations of three vertices, making sure they are distinct, and then checks if there is an edge between each pair of vertices in the triple. If there is an edge between all three vertices, it indicates the presence of a triangle in the graph.

The time complexity of this brute force approach is `O(|V|^3)` because there are three nested loops iterating over all vertices in the graph. In the worst case, this algorithm will examine every possible combination of three vertices, which is cubic in the number of vertices.

### (b) Improve your algorithm to run in time `O(|V|*|E|)`. You may assume `|V| <= |E|`.

The algorithm can be improved to `O(|V|*|E|)` by first looping through each vertex. Then for each vertex, "v", looping through each edge and checking if the two nodes making up that edge themselves have an edge with "v". If so this means there is a triangle.

```python
def has_triangle(G):
    for v in G.vertices:
        for edge in G.edges
            if G.has_edge(v, edge[0]) and G.has_edge(v, edge[1]):
                return True
    return False
```

The time complexity of this approach is `O(|V|*|E|)`, because we look over every node, and for each look over every edge.

In my typescript implementation, the graph class I am using is based around a adjacency list (`Map<number, Set<number>>`). So to implement this algorithm required generating an edge list from this list.

```ts
function createEdgeList(graph: Graph): Set<[number, number]> {
  const edgeList = new Set<[number, number]>();

  for (const [key, value] of graph.getAdjacencyList()) {
    for (const edge of value) {
      edgeList.add([key, edge]);
    }
  }

  return edgeList;
}
```

This takes `O(E)`, because it only looks at every edge once. So when used in the full algorithm, it does not have an impact on the higher `O(|V|*|E|)` time complexity.

The full typescript implementation is as follows:

```ts
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
```

Very similar to python, but a bit more typesafe