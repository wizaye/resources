# Dynamic Programming

## Short Notes

### What It Actually Is

Recursion, plus remembering the answer to every subproblem you've already solved, so you never solve the same one twice. That's the entire technique. It only applies when a problem has two specific properties, and confirming both, out loud, is the actual skill being tested, not memorizing DP problem categories.

### The Two Properties That Must Both Hold

- **Overlapping subproblems**: the same smaller subproblem gets solved multiple times if you just did plain recursion. This is exactly the "waste" identified in the recursion tree from [Recursion](../basic-foundation/recursion.md), `fib(2)` getting computed twice from two different branches.
- **Optimal substructure**: the optimal answer to the full problem can be built directly from optimal answers to its subproblems. If the best solution to a subproblem doesn't actually help build the best solution overall, DP doesn't apply, no matter how much recursion is involved.

> [!IMPORTANT]
> Overlapping subproblems without optimal substructure just means "expensive recursion," not DP. Both properties are required. If you're unsure whether a problem qualifies, try to write the recurrence relation, if you can express `answer(n)` cleanly in terms of `answer(smaller n)`, optimal substructure is present.

### The Two Ways to Implement It

**Top-down (memoization)**: write the plain recursive solution first, then add a cache. Closest to how you'd naturally think through the problem.

```java
Map<Integer, Long> memo = new HashMap<>();
long fib(int n) {
    if (n <= 1) return n;
    if (memo.containsKey(n)) return memo.get(n);
    long result = fib(n - 1) + fib(n - 2);
    memo.put(n, result);
    return result;
}
```

**Bottom-up (tabulation)**: build the answer iteratively from the smallest subproblem upward, no recursion at all.

```java
long fib(int n) {
    if (n <= 1) return n;
    long[] dp = new long[n + 1];
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}
```

> [!TIP]
> Start with top-down, it's a smaller mental leap from the brute force, then convert to bottom-up once the recurrence is correct. Bottom-up avoids recursion's call-stack overhead and is usually what "optimize this further" is asking for.

### Space Optimization, the Step After That

If `dp[i]` only ever depends on the last one or two values, not the entire array, you don't need the array at all, a couple of variables suffice. This is the [DSA README's Worked Example 1](../README.md#worked-example-1-recursion--dp--space-optimized-dp) taken to its conclusion.

```java
// Same Fibonacci, O(1) space instead of O(n)
long fib(int n) {
    if (n <= 1) return n;
    long prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        long curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
```

### Recognizing DP From the Problem, Not the Label

No interview problem announces itself as DP. Look for this shape instead: the answer at step `n` can be expressed using the answer at some smaller step(s), and the problem asks for a **count** ("how many ways"), an **optimum** ("minimum/maximum cost, longest/shortest"), or a **feasibility check** ("is it possible to reach X").

| Signal | Common DP shape |
|---|---|
| "Number of ways to reach/do X" | Counting DP, sum over valid transitions |
| "Minimum/maximum cost or value" | Optimization DP, min/max over valid transitions |
| "Longest/shortest subsequence or substring meeting a condition" | Sequence DP, often 2D over two strings/arrays |
| Decisions with a running budget or capacity (weight, time, count) | Knapsack-style DP, state includes the remaining budget |

### Common DP Families Worth Knowing by Name

- **1D DP**: state depends on one index (Climbing Stairs, House Robber)
- **2D DP over two sequences**: state depends on a position in each of two strings/arrays (Longest Common Subsequence, Edit Distance)
- **Knapsack-style**: state includes an index plus a remaining capacity/budget (0/1 Knapsack, Coin Change, Partition Equal Subset Sum)
- **Interval DP**: state depends on a range `[i, j]`, built from smaller ranges inside it (Matrix Chain Multiplication, Burst Balloons)

---

## Problems

- Climbing Stairs, the entry point, same shape as Fibonacci above
- House Robber, 1D DP with a "skip or take" decision at each step
- Longest Common Subsequence, the canonical 2D-over-two-strings DP
- Coin Change (minimum coins), revisit this from [Greedy](./greedy.md), same problem, this time solved correctly
- 0/1 Knapsack, or Partition Equal Subset Sum, the knapsack-shaped DP with a capacity in the state

---

## Resources

- [GeeksforGeeks - Dynamic Programming](https://www.geeksforgeeks.org/dsa/dynamic-programming/)

---
*Back to [Roadmap & Prerequisites](../roadmap.md)*
