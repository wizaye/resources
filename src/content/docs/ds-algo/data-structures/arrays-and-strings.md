# Arrays & Strings

## Short Notes

### Why This Is the Base Everything Sits On

Arrays are contiguous memory, indexable in O(1). Strings are, under the hood, arrays of characters, with one extra wrinkle: in most languages they're **immutable**, every "modification" actually builds a new string. That single fact explains most string-related time complexity surprises.

> [!WARNING]
> Concatenating a string inside a loop (`result += char`) silently costs O(n) per concatenation in immutable-string languages (Java, Python, C#), turning an apparently O(n) loop into O(n²) overall. Use a mutable buffer (`StringBuilder` in Java, a list joined at the end in Python) when building a string across many iterations.

### Core Operations and Their Real Cost

| Operation | Array | String |
|---|---|---|
| Access by index | O(1) | O(1) |
| Search for a value | O(n) | O(n) |
| Insert/delete at the end | O(1) amortized | O(n), builds a new string |
| Insert/delete in the middle | O(n), shifts elements | O(n), builds a new string |

### Techniques Worth Internalizing Here, Before They Get Their Own Files

Two Pointers and Sliding Window get their own dedicated files, but they only make sense once you're fluent with basic array/string traversal, so the mental model starts here:

- **Prefix sums**: precompute cumulative sums once, then answer any range-sum query in O(1) instead of re-summing the range every time. The setup is the same idea behind why Hashing turns repeated linear scans into O(1) lookups.
- **In-place modification**: many array problems ask you to modify without extra space, using swap operations and a slow/fast index pair to overwrite the array as you go (Remove Duplicates from Sorted Array is the canonical example).

```java
// In-place: remove duplicates from a sorted array, O(1) extra space
int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;
    int slow = 0;
    for (int fast = 1; fast < nums.length; fast++) {
        if (nums[fast] != nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;
}
```

### Common String-Specific Gotchas

- Character comparison and ASCII values, know `char - '0'` converts a digit character to its integer value, and that this trick generalizes to checking letter ranges without a lookup table
- Case sensitivity, don't assume a problem wants case-insensitive comparison unless it says so
- Anagram checks reduce to frequency counting (an array of 26 counts for lowercase English letters is usually faster than a hashmap here, fixed small range beats a general-purpose structure)

---

## Problems

- Two Sum (the canonical bridge into Hashing, brute force here is O(n²), the fix is the very next file)
- Product of Array Except Self, prefix and suffix products without division
- Valid Anagram, frequency counting
- Longest Common Prefix, straightforward but tests clean string traversal
- Remove Duplicates from Sorted Array, the in-place two-pointer pattern above

---

## Resources

- [GeeksforGeeks - Array Data Structure](https://www.geeksforgeeks.org/dsa/array-data-structure-guide/)
- [GeeksforGeeks - String Data Structure](https://www.geeksforgeeks.org/dsa/string-data-structure/)

> [!NOTE]
> No Coddy visualizer for plain arrays or strings, they're too fundamental to need step-through animation. The visualizers start paying off from [Hashing](./hashing.md) onward.

---
*Back to [Roadmap & Prerequisites](../README.md)*