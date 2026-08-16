# Graph Algorithms

## Short Notes

### Representing a Graph First

Before any algorithm, you need to actually store the graph. The near-universal choice for interviews: an **adjacency list**, a hashmap or array where each node maps to a list of its neighbors. Adjacency matrices exist but waste space (O(V²)) unless the graph is genuinely dense.

```java
Map<Integer, List<Integer>> graph = new HashMap<>();
graph.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
graph.computeIfAbsent(v, k -> new ArrayList<>()).add(u); // omit this line if directed
```

### DFS and BFS, the Two Ways to Traverse

Both visit every reachable node exactly once, O(V + E), covered in the graph-specific row of the [Complexity Analysis](../basic-foundation/complexity-analysis.md) table. They differ in *order*, and that order is the entire reason to pick one over the other.

> [!TIP]
> Watch both traverse the same graph side by side: [Coddy - Depth-First Search](https://coddy.tech/visualize/graphs/depth-first-search) · [Coddy - Breadth-First Search](https://coddy.tech/visualize/graphs/breadth-first-search)

```java
// DFS: dive as deep as possible down one branch before backtracking
void dfs(int node, Set<Integer> visited, Map<Integer, List<Integer>> graph) {
    if (visited.contains(node)) return;
    visited.add(node);
    process(node);
    for (int neighbor : graph.getOrDefault(node, List.of())) {
        dfs(neighbor, visited, graph);
    }
}

// BFS: explore level by level, nearest nodes first, uses a queue not recursion
void bfs(int start, Map<Integer, List<Integer>> graph) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    queue.offer(start);
    visited.add(start);
    while (!queue.isEmpty()) {
        int node = queue.poll();
        process(node);
        for (int neighbor : graph.getOrDefault(node, List.of())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.offer(neighbor);
            }
        }
    }
}
```

> [!IMPORTANT]
> **On an unweighted graph, BFS finds the shortest path.** The first time BFS reaches any node is guaranteed to be via the shortest path to it, because it explores in strict distance order. DFS gives you no such guarantee, it might reach a node via a long, winding path first. If a problem asks for "shortest," "minimum steps," or "fewest moves" on an unweighted graph, that's BFS, not DFS.

### Topological Sort: Ordering a DAG

Only applies to a **Directed Acyclic Graph**, an ordering where every edge points forward, node A appears before node B whenever there's an edge A → B. This is exactly the shape of "task scheduling with dependencies," "course prerequisites," or "build order."

> [!TIP]
> [Coddy - Topological Sort](https://coddy.tech/visualize/graphs/topological-sort)

```java
// Kahn's Algorithm: BFS-based, using in-degree counts
List<Integer> topologicalSort(int n, Map<Integer, List<Integer>> graph) {
    int[] inDegree = new int[n];
    for (var neighbors : graph.values())
        for (int neighbor : neighbors) inDegree[neighbor]++;

    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < n; i++) if (inDegree[i] == 0) queue.offer(i);

    List<Integer> order = new ArrayList<>();
    while (!queue.isEmpty()) {
        int node = queue.poll();
        order.add(node);
        for (int neighbor : graph.getOrDefault(node, List.of())) {
            if (--inDegree[neighbor] == 0) queue.offer(neighbor);
        }
    }
    return order.size() == n ? order : List.of(); // empty if a cycle exists, sort is impossible
}
```

> [!TIP]
> That size check at the end is also a cycle detector for free, if fewer than `n` nodes made it into `order`, some nodes never reached in-degree zero, which only happens if a cycle exists somewhere.

### Shortest Path With Weights: Dijkstra, Bellman-Ford, Floyd-Warshall

The escalation chain from the [DSA README's worked example](../README.md#worked-example-3-graph-traversal--bfs--dijkstra--bellman-ford--floyd-warshall), each algorithm exists because the previous one's assumption broke under a new constraint.

> [!TIP]
> [Coddy - Dijkstra's Algorithm](https://coddy.tech/visualize/graphs/dijkstras-algorithm) · [Coddy - Bellman-Ford Algorithm](https://coddy.tech/visualize/graphs/bellman-ford-algorithm)

```java
// Dijkstra: greedily expand the closest unvisited node, using a min-heap
int[] dijkstra(int n, int start, Map<Integer, List<int[]>> graph) { // neighbor, weight pairs
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[start] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]); // node, distance
    pq.offer(new int[]{start, 0});

    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int node = curr[0], d = curr[1];
        if (d > dist[node]) continue; // outdated entry, skip
        for (int[] edge : graph.getOrDefault(node, List.of())) {
            int neighbor = edge[0], weight = edge[1];
            if (dist[node] + weight < dist[neighbor]) {
                dist[neighbor] = dist[node] + weight;
                pq.offer(new int[]{neighbor, dist[neighbor]});
            }
        }
    }
    return dist;
}
```

| Algorithm | Handles | Time | When to use |
|---|---|---|---|
| Dijkstra | Non-negative weights only | O((V+E) log V) | Default choice for weighted shortest path |
| Bellman-Ford | Negative weights, detects negative cycles | O(V·E) | Only when negative edges are possible |
| Floyd-Warshall | All-pairs shortest paths | O(V³) | Need distances between every pair, not just from one source |

### Minimum Spanning Tree: Kruskal's and Prim's

Both find the cheapest set of edges that connects every node with no cycles, both are greedy (see [Greedy](./greedy.md)), they just greedily approach it from different directions.

> [!TIP]
> [Coddy - Kruskal's Algorithm](https://coddy.tech/visualize/graphs/kruskals-algorithm) · [Coddy - Prim's Algorithm](https://coddy.tech/visualize/graphs/prims-algorithm)

- **Kruskal's**: sort all edges by weight, greedily add the cheapest edge that doesn't create a cycle. Cycle detection here uses [Union-Find](./advanced.md#union-find), which is exactly why Union-Find is a direct prerequisite for Kruskal's specifically.
- **Prim's**: start from any node, greedily grow the tree by always adding the cheapest edge that connects a new node to the tree so far, using a min-heap to always know the cheapest available crossing edge.

| | Kruskal's | Prim's |
|---|---|---|
| Approach | Sort all edges globally, pick greedily | Grow outward from a starting node |
| Time | O(E log E) | O(E log V) |
| Better for | Sparse graphs (few edges) | Dense graphs (many edges) |

---

## Problems

- Number of Islands, DFS or BFS on a grid, the most common "is this actually a graph problem" disguise
- Course Schedule, cycle detection on a directed graph, and Course Schedule II, the topological sort version
- Network Delay Time, Dijkstra applied directly
- Cheapest Flights Within K Stops, Bellman-Ford, specifically because the "at most K stops" constraint breaks Dijkstra's greedy assumption
- Min Cost to Connect All Points, Minimum Spanning Tree, try both Kruskal's and Prim's on the same problem

---

## Resources

- [Coddy - Graph Algorithms](https://coddy.tech/visualize/graphs), the full comparison table with every algorithm above in one place
- [GeeksforGeeks - Graph Data Structure and Algorithms](https://www.geeksforgeeks.org/dsa/graph-data-structure-and-algorithms/)

---
*Back to [Roadmap & Prerequisites](../roadmap.md)*
