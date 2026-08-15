# Greedy

## Short Notes

### The Core Idea, and the Catch

At every step, make the choice that looks best *right now*, never reconsider it, never look ahead. That's the entire algorithm. The catch: this only produces the correct final answer for problems that have a specific mathematical property, it doesn't work everywhere, and knowing when it's actually valid is the real skill here, not the technique itself.

### When Greedy Actually Works

A problem is safe for a greedy approach when it has:

- **Greedy choice property**: a locally optimal choice at each step leads to a globally optimal solution, you never need to revisit an earlier decision
- **Optimal substructure**: the optimal solution to the whole problem contains optimal solutions to its subproblems

> [!IMPORTANT]
> If you can construct even one counterexample where the "obvious" locally-best choice leads to a worse overall outcome, greedy is the wrong approach and you're actually looking at [Dynamic Programming](./dynamic-programming.md) instead, DP exists specifically for problems that look greedy but need to consider multiple possibilities before committing. Proving greedy is correct (even informally, out loud in an interview) is expected, not optional.

### A Worked Example of the Failure Mode

Coin change with coins `[1, 3, 4]`, target `6`. Greedy picks the largest coin that fits each time: `4`, then `1`, then `1`, that's 3 coins. The actual optimal answer is `3 + 3`, 2 coins. Greedy fails here because a locally-best choice (grab the biggest coin available) locked in a worse total. This exact problem, minimum coins to make change with arbitrary denominations, is solved correctly with DP instead, precisely because greedy's assumption breaks.

> [!TIP]
> Coin change *does* work greedily for specific coin systems (like most real-world currency, where denominations are designed to make greedy optimal). That's the nuance: greedy's correctness depends on the specific structure of the input, not on the problem category alone.

### Where Greedy Genuinely Is the Right Answer

- **Interval scheduling** (Activity Selection): sort by end time, greedily pick the next activity that starts after the last one picked ends. Provably optimal, because picking the earliest-ending option always leaves the most room for future choices.
- **Huffman Coding**: repeatedly merge the two lowest-frequency nodes. Provably optimal for building a minimum-cost prefix code.
- **Kruskal's and Prim's Algorithms**: both are greedy at their core, always take the cheapest available edge that doesn't break the required property. Covered fully in [Graph Algorithms](./graph-algorithms.md).
- **Dijkstra's Algorithm**: greedily expand the closest unvisited node next. Also covered in [Graph Algorithms](./graph-algorithms.md), and the reason it breaks under negative edge weights ties directly back to the [DSA README's worked example](../README.md#worked-example-3-graph-traversal--bfs--dijkstra--bellman-ford--floyd-warshall) on why Bellman-Ford exists.

```java
// Activity Selection: sort by end time, greedily take non-overlapping activities
int maxActivities(int[][] activities) {
    Arrays.sort(activities, (a, b) -> a[1] - b[1]); // sort by end time
    int count = 1;
    int lastEnd = activities[0][1];
    for (int i = 1; i < activities.length; i++) {
        if (activities[i][0] >= lastEnd) { // starts after the last one ends
            count++;
            lastEnd = activities[i][1];
        }
    }
    return count;
}
```

### The Practical Test to Run in an Interview

Before committing to a greedy approach out loud: try to construct a small counterexample yourself, 3 or 4 elements, and check if the greedy choice still gives the right answer. If you can't break it in under a minute of trying, that's reasonable (not airtight) evidence the greedy choice property holds here.

---

## Problems

- Activity Selection / Non-overlapping Intervals, the interval scheduling pattern above
- Jump Game, greedily track the farthest reachable index
- Gas Station, greedy with a clean proof of why a failed attempt can safely skip ahead rather than restart from every index
- Coin Change (with the DP version, specifically to see firsthand why greedy fails on arbitrary denominations, revisit the worked example above)
- Task Scheduler, greedy scheduling driven by a heap, direct continuation from [Heaps](../data-structures/heaps.md)

---

## Resources

- [GeeksforGeeks - Greedy Algorithms](https://www.geeksforgeeks.org/dsa/greedy-algorithms/)

---
*Back to [Roadmap & Prerequisites](../README.md)*