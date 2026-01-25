# Sample Questions

Example questions for reference and testing.

---

## Easy: Array Sum

### Problem Statement

Given an array of integers, find the sum of all elements.

### Constraints

- 1 ≤ arr.length ≤ 10^5
- -10^9 ≤ arr[i] ≤ 10^9

### Sample Input

```
arr = [1, 2, 3, 4, 5]
```

### Sample Output

```
15
```

### Test Cases

```javascript
// Test Case 0
input: [1, 2, 3, 4, 5];
expected: 15;

// Test Case 1
input: [-1, -2, -3];
expected: -6;

// Test Case 2
input: [0];
expected: 0;
```

### Solution

```javascript
function arraySum(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
}
```

---

## Medium: Two Sum

### Problem Statement

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.

### Constraints

- 2 ≤ nums.length ≤ 10^4
- -10^9 ≤ nums[i] ≤ 10^9
- Only one valid answer exists

### Sample Input

```
nums = [2, 7, 11, 15]
target = 9
```

### Sample Output

```
[0, 1]
```

### Test Cases

```javascript
// Test Case 0
input: { nums: [2, 7, 11, 15], target: 9 }
expected: [0, 1]

// Test Case 1
input: { nums: [3, 2, 4], target: 6 }
expected: [1, 2]

// Test Case 2
input: { nums: [3, 3], target: 6 }
expected: [0, 1]
```

### Solution

```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
```

---

## Hard: Longest Substring Without Repeating Characters

### Problem Statement

Given a string `s`, find the length of the longest substring without repeating characters.

### Constraints

- 0 ≤ s.length ≤ 5 × 10^4
- s consists of English letters, digits, symbols and spaces

### Sample Input

```
s = "abcabcbb"
```

### Sample Output

```
3
```

### Explanation

The answer is "abc", with the length of 3.

### Test Cases

```javascript
// Test Case 0
input: 'abcabcbb';
expected: 3;

// Test Case 1
input: 'bbbbb';
expected: 1;

// Test Case 2
input: 'pwwkew';
expected: 3;

// Test Case 3
input: '';
expected: 0;
```

### Solution

```javascript
function lengthOfLongestSubstring(s) {
  const charIndex = new Map();
  let maxLength = 0;
  let start = 0;

  for (let end = 0; end < s.length; end++) {
    if (charIndex.has(s[end]) && charIndex.get(s[end]) >= start) {
      start = charIndex.get(s[end]) + 1;
    }
    charIndex.set(s[end], end);
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}
```

---

## React: Counter Component

### Problem Statement

Create a React functional component called `Counter` that:

1. Displays a count starting at 0
2. Has an "Increment" button that increases the count by 1
3. Has a "Decrement" button that decreases the count by 1
4. Has a "Reset" button that sets the count back to 0

### Requirements

- Use React hooks (useState)
- Count should not go below 0
- Apply proper styling

### Solution

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));
  const reset = () => setCount(0);

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <div className="buttons">
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

export default Counter;
```
