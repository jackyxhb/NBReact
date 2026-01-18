---
description: Start a HackerRank-style practice session with AI-generated questions
---

# Practice Mode Workflow

**Triggers**: `/practice [topic] [difficulty]` or natural language like "practice React hooks"

## Steps

1. **Load Configuration**
   - Read `config.json` for defaults
   - Apply any overrides from command (topic, difficulty, etc.)
   - Display current session settings

2. **Generate Question**
   - Based on topic and difficulty, either:
     - Generate a HackerRank-style question using AI
     - Search authoritative sources for relevant questions
   - Format according to configured `platformStyle`

3. **Present Question**
   - Display in HackerRank-style format:
     - Problem statement
     - Constraints
     - Input/Output format
     - Sample test cases
   - Open HTML notebook if code execution needed
   - Start timer if enabled

4. **Await User Answer**
   - User provides solution (code or answer)
   - Can request hints or clarification

5. **Evaluate Answer**
   - AI analysis of approach and code quality
   - Run against test cases (if applicable)
   - Calculate score with breakdown:
     - Correctness (test cases passed)
     - Code quality
     - Time/space complexity
     - Partial credit if applicable

6. **Display Results**
   - Show score percentage
   - Test cases passed/failed
   - Detailed feedback
   - Correct solution (if requested)

7. **Update Progress**
   - Save to `progress/history.json`
   - Log token consumption

8. **Continue Loop**
   - Ask: "Next question?" or "End session?"
   - If next: return to Step 2
   - If end: save session summary

9. **Self-Verification**
   - Validate question format correctness
   - Verify test cases are executable
   - Confirm score calculation accuracy

## Session State

Session can be saved at any point with `/save` and resumed with `/resume`.

State saved to `practice/sessions/{session-id}.json`:

```json
{
  "id": "session-uuid",
  "startTime": "ISO-timestamp",
  "config": { ... },
  "questions": [
    { "question": "...", "answer": "...", "score": 85, "feedback": "..." }
  ],
  "currentQuestion": 3,
  "totalScore": 0
}
```
