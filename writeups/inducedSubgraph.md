## Maximum Induced Subgraph

### Problem Statement

Given an undirected graph `G` with `n` vertices and `m` edges, and an interger `k`, given an `O(m+n)` algorithm that finds the maximum induced subgraph `H` of `G` such that each vertex in `H` has degree >= `k`, or prove that no such graph exists. An induced subgraph `F = (U,R)` of a grapg `G = (V, E)` is a subset of `U` of the vertices `V` of `G`, and all edges `R` of `G` such that both vertices of each edge are in `U`.

### Algorithm

1. Initialize `H` as a copy of `G`.
2. Create a queue `Q` to hold all vertices of `H` whose degree is less than `k`.
3. For each vertex `v` in `H`:
   a. If the degree of `v` is less than `k`, add `v` to `Q`.
4. While `Q` is not empty:
   a. Remove a vertex `v` from `Q`.
   b. For each neighbor `u` of `v` in `H`:
    i. Reduce the degree of `u` by 1.
    ii. If the degree of `u` falls below `k`, add `u` to `Q`.
   c. Remove `v` and its incident edges from `H`.
5. If the remaining graph `H` is empty, return failure.
6. Otherwise, return `H`.

### Explanation

The above algorithm ensures that if a vertex has a degree less than `k`, it cannot be part of the final subgraph `H`. It does this by checking each vertex to see if its degree is less than `k`. In the case we want to remove the node, but that may cause the degree of their neighbors to drop, potentially making them also ineligible to be part of `H`. This cascading effect is handled by the queue `Q`, which stores all vertices affected by removals. Whenever we dequeue a vertex, we ensure to recheck all of its neighbors, who's degree has now changed, and potentially mark them for removal by adding them to the queue. Once the queue is empty we can be sure that all remaining nodes have at least degree of `k`.

### Time Complexity

The algorithm runs in `O(m+n)` time because each edge is considered at most once when decrementing the degrees, and each vertex is processed once when it is removed or when its degree is updated.

### Implementation

```ts
function findInducedSubgraph(graph: Graph, k: number): SubGraphReturn {
  const subgraph = graph.copy();

  const queue: number[] = [];

  subgraph.getVertices().forEach((vertex) => {
    if (subgraph.getDegree(vertex) < k) {
      queue.push(vertex);
    }
  });

  while (queue.length > 0) {
    const vertex = queue.shift()!;
    const neighbors = subgraph.getNeighbors(vertex);

    neighbors.forEach((neighbor) => {
      if (subgraph.contains(neighbor)) {
        subgraph.removeEdge(vertex, neighbor);

        if (subgraph.getDegree(neighbor) < k) {
          queue.push(neighbor);
        }
      }
    });

    subgraph.removeVertex(vertex);
  }

  if (subgraph.isEmpty()) {
    return { found: false, graph: undefined };
  } else {
    return { found: true, graph: subgraph };
  }
}
```
