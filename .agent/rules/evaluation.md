# Evaluation Rules

Standards for scoring and evaluating user answers in practice mode.

---

## Scoring Strictness Levels

Read from `config.json` → `scoringStrictness`. Values: `lenient`, `balanced`, `strict`.

### Lenient

- Focus on correct approach and logic
- Minor syntax errors forgiven
- Partial credit generously awarded
- Encourage learning over perfection

### Balanced (Default)

- Correct output required for full credit
- Minor issues reduce score slightly
- Fair partial credit for incomplete solutions
- Code quality matters but isn't primary

### Strict

- Exact output match required
- All edge cases must pass
- Code quality significantly impacts score
- Minimal partial credit

---

## Scoring Breakdown

### For Coding Problems (100 points total)

| Component | Lenient | Balanced | Strict |
|-----------|---------|----------|--------|
| Test Cases (correctness) | 50% | 60% | 70% |
| Approach/Logic | 25% | 20% | 15% |
| Code Quality | 15% | 15% | 10% |
| Complexity (time/space) | 10% | 5% | 5% |

### Test Case Scoring

- Each test case weighted equally
- For N test cases: each worth `(Test Case Weight) / N` points
- Partial credit:
  - Lenient: 50% for wrong answer with correct approach
  - Balanced: 25% for partial correctness
  - Strict: 0% unless exactly correct

### Code Quality Criteria

- Clear variable/function naming (+20%)
- Proper indentation/formatting (+20%)
- No unnecessary code (+20%)
- Good comments/documentation (+20%)
- Follows language conventions (+20%)

### Complexity Analysis

- Optimal solution: 100%
- Within one factor: 75%
- Brute force but works: 50%
- Inefficient/timeout risk: 25%

---

## For Multiple Choice Questions

- Correct: 100%
- Incorrect: 0%
- (No partial credit)

---

## For Conceptual/Essay Questions

| Criteria | Weight |
|----------|--------|
| Correctness of concepts | 40% |
| Completeness | 25% |
| Clarity of explanation | 20% |
| Examples provided | 15% |

---

## Feedback Generation

Always provide:

1. **Score summary** with breakdown
2. **What went well** (positive feedback)
3. **What could improve** (constructive criticism)
4. **Correct solution** (if requested or score < 70%)
5. **Learning resources** (for weak areas)

---

## Self-Verification Checklist

Before presenting evaluation:

- [ ] Score calculated correctly
- [ ] All test cases executed
- [ ] Feedback is constructive
- [ ] Score matches strictness level
- [ ] Partial credit applied appropriately
