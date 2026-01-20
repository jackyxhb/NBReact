---
description: Start a HackerRank-style practice session with AI-generated questions
---

# Practice Mode Workflow

**Triggers**: `/practice [topic] [difficulty]` or natural language like "practice React hooks"

## Quick Start Examples

```
/practice                          # Uses defaults from config.json
/practice react                    # React, default difficulty
/practice react medium             # React, medium difficulty
/practice algorithms hard 3        # 3 hard algorithm questions
/practice javascript easy --timer  # With timer enabled
```

---

## Complete Workflow Steps

### Step 1: Initialize Session

// turbo

```
1. Read config.json for defaults
2. Parse command arguments for overrides
3. Check for existing active session in practice/current/
4. If exists: prompt continue or start new
5. Generate session ID
6. Create session file
```

**Session Config Resolution**:

- Command args > config.json defaults
- Validate topic is supported
- Validate difficulty is easy|medium|hard

---

### Step 2: Generate Question

Based on topic and difficulty, generate a HackerRank-style question.

**For Coding Questions**:

1. Select question type based on topic
2. Generate problem statement
3. Create constraints
4. Generate test cases (3 visible, 2-5 hidden)
5. Prepare starter code
6. Define expected solution patterns

**For MCQ**:

1. Generate concept question
2. Create 4 plausible options
3. Mark correct answer
4. Prepare explanation

**Question Generation Prompt Template**:

```
Generate a {difficulty} level {topic} question in HackerRank format:

Requirements:
- Clear problem statement
- Realistic constraints
- 3 sample test cases with explanations
- 3-5 hidden test cases
- Starter code template

Format:
## [Title]
### Problem
[statement]
### Constraints
[list]
### Sample Input/Output
[examples]
### Test Cases (JSON)
[array of test cases]
```

---

### Step 3: Present Question & Open Notebook

// turbo

**Automatic Actions**:

1. Generate notebook HTML with question data
2. Save to notebook/current.html
3. **Automatically open** the notebook in the default browser using `open` command
4. Present question summary in chat

**Chat Presentation** (shown alongside notebook):

```markdown
---
## 🎯 Question 1 of 5 | React | Medium
---

## [Problem Title]

### Problem Statement
[Brief description - full details in notebook]

### Key Requirements
- requirement 1
- requirement 2

---
📓 **Notebook opened in browser** - write your solution there
💻 Or paste code directly in chat
⏱️ Timer: [HH:MM:SS] (if enabled)
```

**Implementation**:

```bash
# Generate and open notebook automatically
open /path/to/NBReact/notebook/current.html
```

---

### Step 4: Receive User Answer

**Accept answer via**:

- Code block in chat
- File reference (@[solution.js])
- "submit" command after editing notebook

**Parse answer**:

1. Extract code content
2. Identify language
3. Validate syntax (basic check)

---

### Step 5: Evaluate Answer

**Evaluation Steps**:

1. **Static Analysis (AI Review)**

   ```
   - Code correctness likelihood
   - Approach identification
   - Pattern matching to optimal
   - Code quality assessment
   - Complexity estimation
   ```

2. **Dynamic Testing (Run Test Cases)**

   ```bash
   # Create temp files
   echo "$USER_CODE" > /tmp/solution.js
   echo "$TEST_CASES_JSON" > /tmp/tests.json
   
   # Run test runner
   node .agent/skills/hackerrank-sim/scripts/test-runner.js \
     /tmp/solution.js \
     /tmp/tests.json \
     solution
   ```

3. **Score Calculation**
   - Apply weights from evaluation.md rules
   - Apply strictness level
   - Calculate partial credit

---

### Step 6: Display Results

**HackerRank-Style Results**:

```markdown
---
## ✅ Results | Score: 85/100
---

### Test Cases
| # | Status | Time | Details |
|---|--------|------|---------|
| 0 | ✅ Passed | 2ms | Sample case |
| 1 | ✅ Passed | 3ms | Edge case |
| 2 | ❌ Failed | - | Expected [0,1], got [1,0] |
| 3 | ✅ Passed | 5ms | Large input |
| 4 | ✅ Passed | 4ms | Hidden |

### Score Breakdown
- Test Cases: 60/70 (4/5 passed)
- Code Quality: 15/15
- Complexity: O(n) optimal ✓ 10/15

### Feedback
**What went well:**
- Clean solution using hash map
- Good variable naming

**Suggestions:**
- Check return order of indices
- Consider edge case of duplicate values

---
🔄 Type `next` for next question | `explain` for detailed solution | `end` to finish session
```

---

### Step 7: Update Progress

// turbo

```javascript
// Record attempt
recordAttempt(topic, difficulty, score, timeSpent);

// Update session file
session.questions.push({
  id: questionNumber,
  title: question.title,
  userAnswer: userCode,
  score: calculatedScore,
  feedback: feedbackText,
  attemptedAt: new Date().toISOString()
});
session.currentQuestion++;
session.totalScore += calculatedScore;

saveSession(session);
```

---

### Step 7b: Archive Question Notebook

// turbo

**Before moving to the next question**, archive the current notebook for later review.

**Archive Location**: `archive/practice/`

**Naming Convention**: `{sessionId}_q{questionId}.html`

**Implementation**:

```bash
# Copy current notebook to archive with unique name
cp notebook/current.html archive/practice/{sessionId}_q{questionId}.html

# Example:
cp notebook/current.html archive/practice/session_20260119051750_q1.html
```

**Purpose**:

- Allows review of past questions and solutions
- Preserves the exact question context
- Enables progress tracking over time

---

### Step 7c: Update Session Markdown Summary

// turbo

**After each question**, append the question and optimal solution to a Markdown summary file.

**File Location**: `progress/session_{sessionId}.md`

**Content Per Question** (append incrementally):

```markdown
## Q{questionId}: {Question Title}

### Problem Statement
{problem description}

### Requirements
{constraints/requirements as bullet list}

### Sample Usage
\`\`\`javascript
{sample usage code}
\`\`\`

### Solution
\`\`\`javascript
{optimal/correct solution}
\`\`\`

---
```

**Implementation**:

1. If file doesn't exist, create it
2. Append the current question's content
3. Use `javascript` or `jsx` code blocks as appropriate
4. Include only: Problem, Requirements, Sample usage, Optimal solution
5. No header section, no scores - just clean reference material

**Example File** (`progress/session_20260119051750.md`):

```markdown
## Q1: useCounter Custom Hook

### Problem Statement
Create a custom React hook that manages counter state...

### Requirements
- Accept optional initialValue parameter
- Provide increment, decrement, reset, set functions
- Memoize all functions with useCallback

### Sample Usage
\`\`\`javascript
const { count, increment } = useCounter(10);
\`\`\`

### Solution
\`\`\`javascript
import { useState, useCallback } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  // ... full implementation
}
\`\`\`

---

## Q2: useFetch Custom Hook
...
```

---

### Step 8: Continue or End Loop

**If "next"**: Return to Step 2
**If "end" or all questions done**:

```markdown
---
## 🏆 Session Complete!
---

### Summary
| Metric | Value |
|--------|-------|
| Questions | 5 |
| Avg Score | 82% |
| Total Time | 45 min |

### By Question
| Q# | Topic | Score |
|----|-------|-------|
| 1 | Two Sum | 85% |
| 2 | Counter | 90% |
| 3 | Array Flat | 75% |
| 4 | useEffect | 80% |
| 5 | Debounce | 80% |

### Recommendations
- Review: Array manipulation edge cases
- Strong: React hooks understanding

---
Session saved. View progress with `/progress`
```

---

## Session Commands

| Command | Action |
|---------|--------|
| `next` | Go to next question |
| `skip` | Skip current, come back later |
| `hint` | Get a hint (-10% score penalty) |
| `explain` | Show full solution (after attempt) |
| `save` | Save and pause session |
| `end` | End session, show summary |

---

## Self-Verification Checklist

Before presenting results:

- [ ] Question format matches platform style
- [ ] All test cases executed successfully
- [ ] Score calculated per evaluation.md rules
- [ ] Progress file updated
- [ ] Session state saved

---

## Error Handling

**Code execution error**:

- Show error message
- Suggest fix
- Allow retry (no score penalty for syntax errors)

**Timeout**:

- Mark as failed
- Suggest optimization

**Missing function**:

- Prompt for function name
- Suggest starter code format
