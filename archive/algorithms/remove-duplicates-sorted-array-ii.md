---
date: 2026-01-21
topic: algorithms
subtopic: arrays
difficulty: medium
source: user-input
---

# Remove Duplicates from Sorted Array II

## Original Question

Given a sorted array nums in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.
Return the length of the subarray after removal (the first k elements of nums should hold the final result).
You must do this in-place with O(1) extra space.

## Solution

---

## 💡 Solution: Remove Duplicates from Sorted Array II

**Topic**: Algorithms (Arrays) | **Difficulty**: Medium | **Type**: Coding

---

### 📋 Understanding the Problem

We need to modify a valid **sorted array** in-place so that no number appears more than twice.

**Key Points:**

- **Input**: A sorted array `nums`.
- **Output**: The new length `k`. The first `k` elements of `nums` must contain the result.
- **Constraint**: Each unique number can appear at most **2 times**.
- **Constraint**: O(1) extra space (in-place modification).

**Edge Cases to Consider:**

- Array with length < 3 (always valid, just return length).
- Array with all identical numbers (e.g., `[1,1,1,1] -> [1,1]`).
- Array with no duplicates.

---

### 🧠 Approach

**Thought Process:**

1. **Brute Force?** We could scan and count, but removing elements in an array (shifting) is expensive O(n²), or using a new array is O(n) space (forbidden).
2. **Two Pointers:** Since the array is **sorted**, duplicates are always grouped together. We can iterate through the array with one pointer (`i`) and build the "valid" array with another pointer (`k`).
3. **The Key Insight:** For any element `nums[i]`, when is it allowed to be added to our valid result?
   - If we have fewer than 2 elements in our result so far (`k < 2`), we always accept it.
   - If `nums[i]` is **different** from the element at position `k-2` (the one added two steps ago).
   - If `nums[i] == nums[k-2]`, it means we already have two copies of that number (at `k-2` and `k-1`), so we skip `nums[i]`.

**Algorithm:**

1. Initialize `k = 0`.
2. Iterate `i` from `0` to `nums.length - 1`.
3. Check if `k < 2` OR `nums[i] > nums[k-2]`.
4. If true: overwrite `nums[k]` with `nums[i]` and increment `k`.
5. Return `k`.

---

### 📝 Step-by-Step Solution

Let's trace `nums = [1, 1, 1, 2, 2, 3]`

**Step 1: Initialization**
`k = 0`, `i = 0`.

**Step 2: Processing**

- **i=0**: `nums[0]=1`. `k < 2` is true. Write `nums[0] = 1`. `k` becomes 1. Array: `[1*, 1, 1, 2, 2, 3]`
- **i=1**: `nums[1]=1`. `k < 2` is true. Write `nums[1] = 1`. `k` becomes 2. Array: `[1, 1*, 1, 2, 2, 3]`
- **i=2**: `nums[2]=1`. `k < 2` is false. Check `nums[2] (1) > nums[k-2] (nums[0]=1)`. False. Skip.
- **i=3**: `nums[3]=2`. Check `nums[3] (2) > nums[0] (1)`. True. Write `nums[2] = 2`. `k` becomes 3. Array: `[1, 1, 2*, 2, 2, 3]`
- **i=4**: `nums[4]=2`. Check `nums[4] (2) > nums[1] (1)`. True. Write `nums[3] = 2`. `k` becomes 4. Array: `[1, 1, 2, 2*, 2, 3]`
- **i=5**: `nums[5]=3`. Check `nums[5] (3) > nums[2] (2)`. True. Write `nums[4] = 3`. `k` becomes 5. Array: `[1, 1, 2, 2, 3*, 3]`

**Result:** `k=5`. First 5 elements are `[1, 1, 2, 2, 3]`.

---

### ✅ Complete Solution

```javascript
/**
 * Removes duplicates from sorted array such that duplicates appear at most twice.
 * @param {number[]} nums
 * @return {number} - New length
 *
 * Time Complexity: O(n) - Single pass
 * Space Complexity: O(1) - In-place
 */
function removeDuplicates(nums) {
  // k tracks the position where the NEXT allowed element should go
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    // If we have fewer than 2 elements, we can always add.
    // If nums[i] is different from the element at k-2, we can add.
    // (Since it's sorted, > is sufficient and implies strictly greater)
    if (k < 2 || nums[i] > nums[k - 2]) {
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}
```

---

### 📊 Complexity Analysis

**Time Complexity: O(n)**

- We traverse the array exactly once with the `i` pointer.

**Space Complexity: O(1)**

- We modify the array in-place using only two integer variables (`i` and `k`).

---

### 🔗 Related Topics

- **Two Pointers**: The technique used here.
- **Array Manipulation**: In-place filtering.
- **Similar Problems**: Remove Duplicates I (At most 1 copy), Remove Element.
