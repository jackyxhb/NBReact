---
description: Get detailed teaching-style answers to HackerRank-style questions
---

# Answer Mode Workflow

**Triggers**: `/answer` or paste question text/screenshot directly

## Quick Start Examples

```
/answer                    # Then paste question
/answer [paste question]   # Direct with question
Just paste a question...   # Natural language trigger
[Paste screenshot]         # Image of question
```

---

## Complete Workflow Steps

### Step 1: Receive Question Input

**Text Input**:

- User pastes question directly
- Or references a file with question

**Screenshot Input**:

- User pastes image directly in chat
- AI uses vision to extract question content

**Parsing**:

```
1. Detect input type (text vs image)
2. If image: Extract text and code using vision
3. Identify question components:
   - Problem statement
   - Constraints
   - Examples
   - Expected function signature
4. Detect platform style (HackerRank/LeetCode/etc)
```

---

### Step 2: Categorize Question

**Topic Detection**:

```
Based on keywords and patterns, identify:
- Primary topic (React, Algorithms, JavaScript, etc.)
- Subtopic (Arrays, Hooks, Closures, etc.)
- Question type (Coding, MCQ, Conceptual)
```

**Difficulty Assessment**:

```
Evaluate based on:
- Constraint ranges
- Required techniques
- Expected complexity
- Problem statement complexity
```

---

### Step 3: Generate Teaching-Style Response

**Response Structure**:

````markdown
---
## 💡 Solution: [Problem Title]
**Topic**: [topic] | **Difficulty**: [level] | **Type**: [coding/mcq]

---

### 📋 Understanding the Problem

[Restate the problem in simpler terms]

**Key Points:**

- Point 1: What we're given
- Point 2: What we need to find
- Point 3: Important constraints

**Edge Cases to Consider:**

- Empty input
- Single element
- Maximum constraints

---

### 🧠 Approach

**Thought Process:**

1. First, let's think about the brute force approach...
2. We can optimize by noticing that...
3. The key insight is...

**Why this approach?**

- [Justification for chosen method]
- [Trade-offs considered]

**Algorithm:**

1. Step one
2. Step two
3. Step three

---

### 📝 Step-by-Step Solution

Let me walk through solving this:

**Step 1: [Description]**

```javascript
// Code for step 1
const setup = ...;
```

_Explanation of what this does_

**Step 2: [Description]**

```javascript
// Code for step 2
const process = ...;
```

_Explanation of what this does_

**Step 3: [Description]**

```javascript
// Putting it together
...
```

---

### ✅ Complete Solution

```javascript
/**
 * [Brief description]
 * @param {Type} param - Description
 * @returns {Type} Description
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solution(param) {
    // Complete, clean solution
    ...
}
```

---

### 📊 Complexity Analysis

**Time Complexity: O(n)**

- We iterate through the array once
- Each operation is O(1)
- Total: O(n)

**Space Complexity: O(1)**

- We only use a few variables
- No additional data structures
- No recursion stack

**Comparison with alternatives:**
| Approach | Time | Space | Trade-off |
|----------|------|-------|-----------|
| Brute Force | O(n²) | O(1) | Simple but slow |
| Hash Map | O(n) | O(n) | Fast, uses memory |
| Two Pointer | O(n) | O(1) | Best if sorted |

---

### 🔗 Related Topics & Resources

**Concepts Used:**

- [Concept 1]: Brief explanation with link
- [Concept 2]: Brief explanation with link

**Similar Problems:**

- Problem A (slightly easier)
- Problem B (similar difficulty)
- Problem C (harder variation)

**Further Learning:**

- [MDN/React Docs link]
- [Tutorial recommendation]

---

📁 Archived to: archive/[topic]/[question-id].md
````

---

### Step 4: Display in Chat

Present the full teaching response in chat with:

- Clear section headers
- Proper code formatting
- Syntax highlighting
- Visual hierarchy

---

### Step 5: Archive Q&A

// turbo

```
1. Determine topic category
2. Generate question ID (slug from title + timestamp)
3. Create archive file: archive/{topic}/{question-id}.md
4. Include:
   - Original question
   - Full solution response
   - Metadata (date, topic, difficulty)
```

**Archive File Format**:

```markdown
---
date: 2026-01-19
topic: algorithms
subtopic: arrays
difficulty: medium
source: hackerrank
---

# [Question Title]

## Original Question

[Full question text]

## Solution

[Complete teaching response]
```

---

### Step 6: Update Progress

// turbo

```javascript
// Log answer mode usage
const entry = {
  type: 'answer',
  topic: detectedTopic,
  difficulty: assessedDifficulty,
  timestamp: new Date().toISOString(),
  archived: archivePath,
};

appendToHistory(entry);
```

---

### Step 7: Self-Verification

Before completing:

- [ ] Response includes all sections
- [ ] Code is syntactically correct
- [ ] Complexity analysis is accurate
- [ ] Archive file created successfully
- [ ] Progress updated

---

## Response Quality Standards

**Explanation Depth**:

- Assume user is learning, not just copying
- Explain WHY, not just WHAT
- Connect to broader concepts

**Code Quality**:

- Clean, readable code
- Proper naming conventions
- Appropriate comments
- Error handling where relevant

**Accuracy**:

- Double-check complexity analysis
- Verify solution handles edge cases
- Ensure code compiles/runs

---

## Alternative Approaches

When applicable, show alternatives:

```markdown
### Alternative Solution: [Approach Name]

If [condition], you might prefer:

\`\`\`javascript
// Alternative implementation
\`\`\`

**Trade-offs:**

- Pro: [advantage]
- Con: [disadvantage]
```

---

## For MCQ Questions

```markdown
---
## 💡 Answer: [Question Summary]
---

### The Question

[Restate question]

### Correct Answer: **[Option X]**

### Explanation

**Why [X] is correct:**
[Detailed explanation]

**Why other options are wrong:**

- **A**: [Why wrong]
- **B**: [Why wrong]
- **C**: [Why wrong]

### Key Concept

[Underlying concept explanation]

### Related Topics

[Links to learn more]

---
```

---

## Error Handling

**Unclear Question**:

```markdown
I need a bit more context. Could you clarify:

1. [Specific question about ambiguity]
2. [Request for constraints if missing]
```

**Screenshot Unreadable**:

```markdown
I'm having trouble reading part of the screenshot. Could you:

- Share a clearer image, OR
- Type out the question text
```

**Multiple Questions**:

```markdown
I see multiple questions. Would you like me to:

1. Answer all of them in sequence
2. Focus on just one (please specify which)
```
