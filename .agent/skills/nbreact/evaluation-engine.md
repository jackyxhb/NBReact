# Evaluation Engine

Detailed logic for evaluating user answers and calculating scores.

---

## Evaluation Flow

```
User Answer
    ↓
┌─────────────────────────┐
│  1. Parse Answer        │
│  - Extract code         │
│  - Identify language    │
└──────────┬──────────────┘
           ↓
┌─────────────────────────┐
│  2. Static Analysis     │
│  - Syntax check         │
│  - Code quality         │
│  - Pattern recognition  │
└──────────┬──────────────┘
           ↓
┌─────────────────────────┐
│  3. Dynamic Testing     │
│  - Run test cases       │
│  - Capture output       │
│  - Measure performance  │
└──────────┬──────────────┘
           ↓
┌─────────────────────────┐
│  4. Score Calculation   │
│  - Apply weights        │
│  - Partial credit       │
│  - Strictness level     │
└──────────┬──────────────┘
           ↓
┌─────────────────────────┐
│  5. Generate Feedback   │
│  - Strengths            │
│  - Improvements         │
│  - Hints/Resources      │
└─────────────────────────┘
```

---

## Test Case Execution

### JavaScript/TypeScript

```javascript
// Execution wrapper
function executeTestCase(userCode, testCase) {
  try {
    // Create sandboxed function
    const fn = new Function('input', userCode + '; return solution(input);');

    // Execute with timeout
    const startTime = performance.now();
    const result = fn(testCase.input);
    const endTime = performance.now();

    return {
      passed: JSON.stringify(result) === JSON.stringify(testCase.expected),
      actual: result,
      expected: testCase.expected,
      executionTime: endTime - startTime,
    };
  } catch (error) {
    return {
      passed: false,
      error: error.message,
      actual: null,
      expected: testCase.expected,
    };
  }
}
```

### Using run_command for Node.js

```bash
# Create temp file with test harness
node -e "
const userCode = \`${USER_CODE}\`;
const testCase = ${TEST_CASE_JSON};
// Execute and output result
"
```

---

## Scoring Formulas

### Base Score Calculation

```
Test Case Score = (Passed Tests / Total Tests) × Test Weight
Code Quality Score = Quality Assessment × Quality Weight
Complexity Score = Complexity Assessment × Complexity Weight

Total Score = Test Case Score + Code Quality Score + Complexity Score
```

### Strictness Adjustments

#### Lenient

- Minor syntax errors: -5% (not -20%)
- Close but wrong output: 50% partial credit
- Inefficient but working: 80% credit

#### Balanced (Default)

- Minor syntax errors: -10%
- Close but wrong output: 25% partial credit
- Inefficient but working: 60% credit

#### Strict

- Any syntax error: 0% for that test
- Wrong output: 0% (no partial)
- Inefficient: -20% penalty

---

## Code Quality Assessment

### Criteria Checklist

| Criterion      | Points | Description                                |
| -------------- | ------ | ------------------------------------------ |
| Naming         | 20     | Clear, descriptive variable/function names |
| Structure      | 20     | Logical organization, proper indentation   |
| Efficiency     | 20     | No unnecessary operations                  |
| Comments       | 20     | Appropriate documentation                  |
| Best Practices | 20     | Language idioms, error handling            |

### Example Assessment

```markdown
**Code Quality: 75/100**

✅ Good naming conventions
✅ Clean structure
⚠️ Missing edge case handling
❌ No error handling for invalid input
```

---

## Complexity Analysis

### Time Complexity Detection

- Loop analysis (single, nested)
- Recursion depth
- Built-in method complexity
- Overall Big-O estimation

### Space Complexity Detection

- Variable declarations
- Data structure usage
- Recursion stack
- Overall memory estimation

### Optimal Comparison

```
Your Solution: O(n²) time, O(1) space
Optimal: O(n) time, O(n) space

Trade-off: You optimized for space at cost of time.
Consider: Hash map approach for O(n) time.
```

---

## Feedback Generation

### Positive Feedback Templates

- "Excellent use of [technique]!"
- "Clean and readable code."
- "Optimal time complexity achieved."
- "Great handling of edge cases."

### Improvement Feedback Templates

- "Consider using [technique] for better performance."
- "Edge case not handled: [description]."
- "Variable naming could be more descriptive."
- "This approach works but [optimal approach] would be more efficient."

### Learning Resource Suggestions

Based on identified weaknesses:

- Link to relevant documentation
- Suggest similar practice problems
- Recommend concepts to review
