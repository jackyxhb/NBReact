# Platform Formatting Rules

These rules define how to format questions, evaluations, and responses to mimic various technical assessment platforms.

## Active Platform

Read from `config.json` → `platformStyle` setting. Defaults to `hackerrank`.

---

## HackerRank Format

### Question Format

```markdown
## [Problem Title]

### Problem Statement

[Clear description of the task]

### Constraints

- 1 ≤ n ≤ 10^5
- 1 ≤ arr[i] ≤ 10^9

### Input Format

- First line: integer n
- Second line: n space-separated integers

### Output Format

- Single integer representing the result

### Sample Input 0
```

5
1 2 3 4 5

```

### Sample Output 0
```

15

```

### Explanation
[Step-by-step explanation of sample]
```

### Evaluation Display

```markdown
## Test Results

### Score: 85/100

| Test Case | Status    | Time  | Memory |
| --------- | --------- | ----- | ------ |
| Case 0    | ✅ Passed | 0.02s | 4.2MB  |
| Case 1    | ✅ Passed | 0.03s | 4.1MB  |
| Case 2    | ❌ Failed | -     | -      |

### Code Quality: Good

- Clean variable naming
- Efficient approach
- Consider edge cases
```

---

## LeetCode Format

### Question Format

```markdown
## [Problem Number]. [Problem Title]

[Problem description with examples inline]

**Example 1:**
```

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9

```

**Example 2:**
```

Input: nums = [3,2,4], target = 6
Output: [1,2]

```

**Constraints:**
- 2 ≤ nums.length ≤ 10^4
- -10^9 ≤ nums[i] ≤ 10^9

**Follow-up:** Can you do it in O(1) space?
```

### Evaluation Display

```markdown
## Result: Accepted ✅

**Runtime**: 52 ms (beats 85%)
**Memory**: 42.1 MB (beats 72%)

### Analysis

- Time: O(n)
- Space: O(n)
```

---

## CodeSignal Format

### Question Format

```markdown
## Task

[Task description]

### Guaranteed Constraints

- array.length ≤ 10^5

### Input/Output

- **[input]** array.integer arr
- **[output]** integer
```

---

## Usage

When generating questions or displaying results:

1. Check `config.json` for `platformStyle`
2. Apply the corresponding format template
3. Maintain consistency throughout the session
