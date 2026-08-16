# Sorting

## Short Notes

### Why Sorting Matters Beyond "Sort This Array"

Rarely does an interview ask you to implement sorting from scratch. It matters because half the patterns in this repo secretly depend on sorted data first, Two Pointers needs a sorted array to converge correctly, Binary Search needs sorted data to work at all, and Merge Intervals / Meeting Rooms style problems start by sorting on one of the interval's endpoints. Recognizing "this problem gets much easier if I sort first" is the actual skill, the sorting algorithm itself is usually just `Arrays.sort()` or `Collections.sort()` with a comparator.

> [!TIP]
> Watch it happen visually before reading further: [Coddy - Sorting Visualizations](https://coddy.tech/visualize/sorting)

### Comparison-Based vs Non-Comparison-Based

Comparison-based sorts (Merge, Quick, Insertion, Selection, Bubble, Heap) work by comparing elements to each other, and are bounded by O(n log n) in the best possible case, no comparison sort can beat that. Non-comparison sorts (Counting, Radix) exploit something about the values themselves, like a known small range, to break past that bound.

### Stability

A sort is **stable** if two elements with equal keys keep their original relative order after sorting. Matters when you're sorting objects by one field but want ties broken by insertion order (e.g. sort employees by department, ties should stay in original list order). Not every sort is stable, check the table below before assuming.

### The Full Comparison

| Algorithm | Best | Average | Worst | Space | Stable | Visualize |
|---|---|---|---|---|---|---|
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes | [Coddy](https://coddy.tech/visualize/sorting/insertion-sort) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | No | [Coddy](https://coddy.tech/visualize/sorting/selection-sort) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | [Coddy](https://coddy.tech/visualize/sorting/merge-sort) |
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes | [Coddy](https://coddy.tech/visualize/sorting/bubble-sort) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No | [Coddy](https://coddy.tech/visualize/sorting/quick-sort) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No | [Coddy](https://coddy.tech/visualize/sorting/heap-sort) |
| Radix Sort | O(nk) | O(nk) | O(nk) | O(n+k) | Yes | [Coddy](https://coddy.tech/visualize/sorting/radix-sort) |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(n+k) | Yes | [Coddy](https://coddy.tech/visualize/sorting/counting-sort) |

> [!IMPORTANT]
> Quick Sort's worst case, O(n²), happens when the pivot choice is consistently bad (already-sorted input with a naive first-element pivot is the classic trap). This is exactly why production sort implementations (Java's `Arrays.sort()` for primitives, for example) either randomize the pivot or fall back to a different algorithm when the input looks adversarial.

### The Two Worth Actually Implementing

Merge Sort and Quick Sort are the two an interviewer might genuinely ask you to write from memory, because both teach a reusable technique (divide and conquer, and partitioning) rather than just being "a way to sort."

```java
// Merge Sort: split, sort each half, merge back together
void mergeSort(int[] arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

void merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;
    while (i <= mid && j <= right) {
        temp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    System.arraycopy(temp, 0, arr, left, temp.length);
}
```

```java
// Quick Sort: pick a pivot, partition around it, recurse on both sides
void quickSort(int[] arr, int low, int high) {
    if (low >= high) return;
    int pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
}

int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
    }
    int tmp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = tmp;
    return i + 1;
}
```

> [!WARNING]
> Merge Sort's O(n) extra space (the `temp` array) is the trade-off for its guaranteed O(n log n) worst case. Quick Sort sorts in place, O(log n) space for the recursion stack, but risks O(n²) on bad pivots. Know which trade-off you're making, and be ready to state it if asked.

---

## Problems

- Implement Merge Sort and Quick Sort from scratch, without looking at the code above once you've read it through
- **Count Inversions in an Array**, a direct application of Merge Sort, count pairs during the merge step instead of just merging
- **Merge Intervals**, sort by start time first, the rest of the problem becomes a single linear pass
- **Meeting Rooms II**, sort start and end times separately, classic case of "the sort is the setup, not the whole solution"
- **Kth Largest Element in an Array**, solvable via a full sort, but also the natural bridge into Quick Select (a Quick Sort variant) and Heaps

---

## Resources

- [Coddy - Sorting Visualizations](https://coddy.tech/visualize/sorting), watch each algorithm run step by step before or after implementing it
- [GeeksforGeeks - Sorting Algorithms](https://www.geeksforgeeks.org/dsa/sorting-algorithms/), for written explanations alongside the visualizations above

---
*Back to [Roadmap & Prerequisites](../roadmap.md)*
