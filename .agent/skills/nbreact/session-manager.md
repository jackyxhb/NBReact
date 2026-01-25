# Session Manager

Utilities for managing practice session state.

---

## Session File Format

Location: `practice/sessions/{session-id}.json`

```json
{
  "id": "uuid-v4",
  "createdAt": "ISO-8601 timestamp",
  "updatedAt": "ISO-8601 timestamp",
  "status": "active|paused|completed",
  "config": {
    "topic": "react",
    "difficulty": "medium",
    "questionsPerSession": 5,
    "scoringStrictness": "balanced",
    "platformStyle": "hackerrank",
    "timeLimitEnabled": false
  },
  "questions": [
    {
      "id": 1,
      "title": "Question Title",
      "content": "Full question content",
      "testCases": [{ "input": "...", "expected": "...", "hidden": false }],
      "userAnswer": "User's submitted code",
      "score": 85,
      "feedback": "Evaluation feedback",
      "timeSpent": 300,
      "attemptedAt": "ISO-8601 timestamp"
    }
  ],
  "currentQuestion": 3,
  "totalScore": 170,
  "averageScore": 85,
  "timeSpent": 1200
}
```

---

## Session Operations

### Create Session

1. Generate UUID for session ID
2. Load config.json defaults
3. Apply command overrides
4. Create session file in `practice/sessions/`
5. Set status to "active"

### Save Session (Pause)

1. Update session file with current state
2. Set status to "paused"
3. Record updatedAt timestamp

### Resume Session

1. Load session file
2. Verify status is "paused"
3. Set status to "active"
4. Return to currentQuestion

### Complete Session

1. Calculate final statistics
2. Set status to "completed"
3. Update progress/history.json
4. Archive session or delete

---

## Current Session Tracking

Active session stored in: `practice/current/session.json`

When starting a new session:

1. Check if current session exists
2. If exists and active, prompt to continue or abandon
3. Create new session file
4. Link to current/session.json

---

## Session Naming Convention

Format: `{date}_{topic}_{difficulty}_{uuid-short}.json`

Example: `2026-01-19_react_medium_a1b2c3.json`

---

## Session Cleanup

Completed sessions older than 30 days:

- Archive to `practice/archive/`
- Or delete if user preference

Paused sessions older than 7 days:

- Prompt to resume or delete
