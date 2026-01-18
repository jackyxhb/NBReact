# Question Generation Templates

Templates for generating HackerRank-style questions by topic and difficulty.

---

## Algorithm Templates

### Easy Algorithm

```markdown
## [Title: Action + Data Structure]

### Problem
Given [input description], return [output description].

### Constraints
- 1 ≤ n ≤ 10^4
- [value range constraints]

### Example
Input: [sample]
Output: [result]
Explanation: [brief explanation]

### Test Cases
1. Basic case
2. Edge case (empty/single element)
3. Edge case (all same values)
```

### Medium Algorithm

```markdown
## [Title: Technique + Problem Type]

### Problem
[Detailed problem with multiple requirements]

### Constraints
- 1 ≤ n ≤ 10^5
- [tighter constraints]

### Examples (2-3)
[Multiple examples with explanations]

### Test Cases
1. Basic case
2. Large input
3. Edge cases (3+)
4. Performance test
```

### Hard Algorithm

```markdown
## [Title: Advanced Technique]

### Problem
[Complex problem with optimizations needed]

### Constraints
- 1 ≤ n ≤ 10^6
- [strict time/space requirements]

### Examples (3+)
[Comprehensive examples]

### Follow-up
Can you solve it in O(n) time and O(1) space?

### Test Cases
1-3. Basic variations
4-6. Edge cases
7-10. Performance stress tests
```

---

## React Templates

### Easy React

```markdown
## Create a [Component Name] Component

### Requirements
1. Display [basic UI element]
2. Handle [single interaction]
3. Use [specific hook: useState]

### Props
- `propName`: type - description

### Expected Behavior
[Clear behavioral description]

### Starter Code
\`\`\`jsx
function ComponentName() {
  // Your code here
  return <div></div>;
}
\`\`\`
```

### Medium React

```markdown
## Build a [Feature] with React

### Requirements
1. [State management requirement]
2. [Event handling requirement]
3. [Conditional rendering]
4. [Styling requirement]

### Props & State
[Detailed specifications]

### User Stories
- As a user, I can...
- As a user, I can...

### Test Scenarios
1. Initial render
2. User interactions
3. Edge cases
```

### Hard React

```markdown
## Implement [Complex Feature]

### Requirements
1. [Custom hook creation]
2. [Performance optimization]
3. [Complex state management]
4. [API integration simulation]

### Architecture
[Component structure diagram]

### Performance Requirements
- Re-renders minimized
- Memoization where appropriate

### Test Scenarios
[Comprehensive test plan]
```

---

## JavaScript Templates

### Easy JavaScript

```markdown
## [Function Name]

Write a function that [description].

### Function Signature
\`\`\`javascript
function functionName(param1, param2) {
  // Your code
}
\`\`\`

### Examples
functionName([1,2,3]) → 6
functionName([]) → 0

### Constraints
- Array length ≤ 1000
```

### Medium JavaScript

```markdown
## [Problem Title]

### Description
[Detailed problem with edge cases to consider]

### Requirements
- Handle [edge case 1]
- Handle [edge case 2]
- Time complexity: O(n)

### Examples
[Multiple examples with varying inputs]
```

### Hard JavaScript

```markdown
## [Advanced Problem]

### Description
[Complex problem requiring multiple techniques]

### Constraints
[Strict performance requirements]

### Hints
1. Consider using [technique]
2. Think about [optimization]
```

---

## Multiple Choice Templates

### Conceptual MCQ

```markdown
## Question

[Question about concept/behavior]

### Options
A) [Option A]
B) [Option B]
C) [Option C]
D) [Option D]

### Answer
[Correct option with explanation]
```

### Code Output MCQ

```markdown
## What is the output?

\`\`\`javascript
[code snippet]
\`\`\`

### Options
A) [output option]
B) [output option]
C) [output option]
D) Error

### Answer
[Correct with step-by-step explanation]
```

---

## Topic-Specific Focus Areas

### React Topics (by difficulty)

- Easy: useState, props, event handlers, conditional rendering
- Medium: useEffect, custom hooks, forms, context basics
- Hard: useReducer, performance optimization, complex state, patterns

### Algorithm Topics (by difficulty)

- Easy: Arrays, strings, basic loops, simple recursion
- Medium: Hash maps, two pointers, sliding window, BFS/DFS basics
- Hard: Dynamic programming, graphs, trees, advanced techniques

### JavaScript Topics (by difficulty)

- Easy: Array methods, string manipulation, basic objects
- Medium: Closures, promises, async/await, prototypes
- Hard: Event loop, generators, proxies, advanced patterns
