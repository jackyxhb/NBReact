# Verification Test Suite

Self-verification tests for the HackerRank Simulator.

---

## Test Categories

### 1. Functionality Tests

#### Practice Mode

- [ ] `/practice` loads config correctly
- [ ] Question generation produces valid format
- [ ] Test cases are executable
- [ ] Scoring calculates correctly per rules
- [ ] Session saves and updates properly
- [ ] Navigation (next/skip/end) works

#### Answer Mode

- [ ] Text question parsing works
- [ ] Screenshot parsing works (when image provided)
- [ ] Response includes all required sections
- [ ] Archive file creates in correct location
- [ ] Progress updates after answering

#### Resume Mode

- [ ] Lists sessions correctly
- [ ] Loads session state properly
- [ ] Continues from correct question
- [ ] Merges progress on completion

#### Progress Mode

- [ ] Statistics calculate correctly
- [ ] Trends analyze properly
- [ ] Recommendations are relevant
- [ ] Report generates and saves

---

### 2. Stability Tests

#### Session Persistence

```
Test: Create session → Pause → Resume → Verify state
Expected: All session data intact
```

#### Code Execution Safety

```
Test: Run malicious code patterns
Expected: Sandboxed, no system impact, timeout works
```

#### Evaluation Consistency

```
Test: Same answer submitted 3 times
Expected: Same score each time
```

#### Archive Integrity

```
Test: Create 10 archive files
Expected: All files exist with valid content
```

---

### 3. Effectiveness Tests

#### Question Quality

```
Metric: Compare AI questions to real HackerRank samples
Target: Similar structure, appropriate difficulty
Method: Manual review of 10 generated questions
```

#### Score Improvement

```
Metric: Track user performance over 10+ questions
Target: Measurable improvement trend
Method: Analyze progress data
```

#### User Feedback

```
Metric: Quality rating (1-5) per question/answer
Target: Average rating ≥ 4
Method: Optional feedback prompt
```

---

### 4. Efficiency Tests

| Operation | Target | Test Method |
|-----------|--------|-------------|
| Question Generation | <5s | Time measurement |
| Answer Evaluation | <10s | Time measurement |
| HTML Notebook Load | <2s | Browser devtools |
| Session Save/Load | <1s | Time measurement |

---

### 5. Token Consumption Tests

#### Baseline Measurements

```
Measure tokens for:
- Single practice question cycle
- Answer mode response
- Progress report generation
- Session management operations
```

#### Optimization Verification

```
Check:
- No redundant context loading
- Efficient prompt structures
- Minimal re-processing
```

---

## Running Tests

### Manual Test Execution

1. **Practice Mode Test**

   ```
   /practice javascript easy 1
   - Verify question format
   - Submit answer
   - Verify evaluation
   - Check session file
   ```

2. **Answer Mode Test**

   ```
   /answer
   [Paste sample question]
   - Verify response sections
   - Check archive file
   ```

3. **Resume Test**

   ```
   /practice react medium 3
   [Answer 1 question]
   "save"
   /resume
   - Verify continuation
   ```

4. **Progress Test**

   ```
   /progress
   - Verify statistics match history
   - Check recommendations logic
   ```

---

## Verification Checklist

### Before Release

- [ ] All functionality tests pass
- [ ] No stability issues found
- [ ] Efficiency within targets
- [ ] Token usage acceptable
- [ ] Documentation complete

### After Each Session

- [ ] Session file valid JSON
- [ ] Progress file updated
- [ ] No orphaned temp files
- [ ] Archive organized correctly
