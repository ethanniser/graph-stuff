## Tree Diameter

### Introduction

The diameter of a tree T = (V, E) is the longest path between two vertices in the tree. It's defined as the maximum delta(u,v) over all pairs of vertices (u, v), where delta(u,v) is the number of edges on the shortest path from vertex u to vertex v.

### Algorithm Overview

1. Start a Depth-First Search (DFS) traversal from any node of the tree.
2. The DFS will return two values for each node:
   - The maximum depth from the current node to its farthest leaf node.
   - The maximum diameter that passes through the current node.
3. Recursively compute the above values for all children of the current node.
4. The diameter for the current node is the sum of the top two depths among its children plus 2 (1 for each edge to the two deepest children).
5. Return the maximum of the current node's diameter and the maximum diameter among its children.
6. The overall diameter of the tree is the maximum of the diameter that passes through the root and the depth of the root.

### Algorithm Pseudocode

1. Initialize `visited` set.
2. Define DFS function `dfs(node) -> (maxDepth, maxDiameter)`.
   - If `node` is a leaf, return `(0, null)`.
   - For each child of `node` that hasn't been visited:
     - Recursively call `dfs(child)`.
   - Compute the maximum diameter passing through `node` using the top two depths among its children.
   - Return `(maxDepthOfNode, maxDiameterThroughNode)`.
3. Call `dfs(root)`.
4. The diameter of the tree is the maximum of the root's depth and the diameter passing through the root.

### Time Complexity

The algorithm traverses each node and edge of the tree exactly once. Since it's based on Depth-First Search, its time complexity is O(V + E), where V is the number of vertices (nodes) and E is the number of edges in the tree.

However, in a tree, the number of edges E is always V - 1, so the time complexity can be simplified to O(V).

### Analysis

The provided code computes the diameter of a tree by considering both the depth of each node and the maximum diameter passing through each node. By using the `visited` set, the algorithm ensures each node and edge are considered only once, achieving linear time complexity relative to the size of the tree.
