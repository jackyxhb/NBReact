---
description: Get detailed teaching-style answers to HackerRank-style questions
---

# Answer Mode Workflow

**Triggers**: `/answer` or paste question text/screenshot directly

## Steps

1. **Parse Question**
   - If text: extract question content
   - If screenshot: use vision to interpret and extract question
   - Identify: topic, difficulty, question type

2. **Categorize Question**
   - Determine topic category (react, algorithms, javascript, etc.)
   - Assess difficulty level
   - Identify platform style (if recognizable)

3. **Generate Teaching-Style Response**
   Structure the response as:

   ### Understanding the Problem

   - Restate the problem in simpler terms
   - Identify key requirements and constraints

   ### Approach

   - Explain the thought process
   - Discuss possible approaches
   - Justify the chosen approach

   ### Step-by-Step Solution

   - Walk through the logic incrementally
   - Explain each decision

   ### Solution Code

   - Provide clean, well-commented code
   - Follow best practices

   ### Complexity Analysis

   - Time complexity with explanation
   - Space complexity with explanation

   ### Related Topics

   - Concepts to review
   - Similar problems to practice
   - Useful resources

4. **Display in Chat**
   - Present full response in conversation
   - Use HackerRank-style formatting

5. **Archive Q&A**
   - Save to `archive/{topic}/{question-id}.md`
   - Include all sections from response
   - Add metadata (date, topic, difficulty)

6. **Update Progress**
   - Log to `progress/history.json`
   - Record token consumption

7. **Self-Verification**
   - Validate response completeness (all sections present)
   - Verify archive file created successfully
   - Confirm progress updated

## Archive File Format

```markdown
# [Question Title]

**Date**: YYYY-MM-DD
**Topic**: [topic]
**Difficulty**: [Easy/Medium/Hard]
**Source**: [Original source if known]

---

## Question

[Original question text]

---

## Solution

### Understanding
[...]

### Approach
[...]

### Step-by-Step
[...]

### Code
\`\`\`javascript
[solution code]
\`\`\`

### Complexity
- Time: O(...)
- Space: O(...)

### Related Topics
- [topic 1]
- [topic 2]
```
