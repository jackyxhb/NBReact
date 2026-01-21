---
description: Watch notebook for AI requests and respond automatically
---

# Notebook Watch Workflow

Run this workflow to enable AI interactions directly from the notebook web page.

## Prerequisites

1. A practice session should be active (start with `/practice` first, or use this workflow to start from notebook)
2. Open the notebook in your browser: `notebook/current.html`

## Start Watching

// turbo-all

### Step 1: Initialize Watch Mode

Tell Antigravity that you're entering notebook watch mode:

```
I am now in notebook watch mode. I will monitor notebook/request.json for incoming requests and respond appropriately.
```

### Step 2: Monitor Request File

Check for new requests by reading the request file:

```bash
cat notebook/request.json
```

### Step 3: Process Request

Based on the request type, perform the appropriate action:

#### Request Type: `evaluate`

- Read the user's code from `request.payload.code`
- Evaluate against the current question's requirements
- Score the solution (0-100)
- Provide detailed feedback
- Write response with score and feedback

#### Request Type: `hint`

- Read the current question context
- Generate a helpful hint WITHOUT giving away the answer
- Focus on guiding the user toward the solution
- Write response with the hint

#### Request Type: `answer`

- Provide the complete solution with explanation
- Include working code
- Explain the approach and key concepts
- Write response with code and explanation

#### Request Type: `next`

- Generate the next question in the session
- Update `notebook/current.html` with new question content
- Update `practice/current/session.json` with progress
- Write response with new question data

#### Request Type: `chat`

- Read the user's message from `request.payload.message`
- Respond conversationally while being helpful
- Answer questions about the problem, React concepts, etc.
- Write response with the chat message

#### Request Type: `start`

- Create a new practice session
- Generate the first question
- Update session files
- Write response with session and question data

### Step 4: Write Response

After processing, write the response to `notebook/response.json`:

```json
{
  "id": "<same as request.id>",
  "timestamp": "<current ISO timestamp>",
  "type": "<same as request.type>",
  "status": "success",
  "data": {
    // Response data based on type
  }
}
```

### Step 5: Continue Watching

Return to Step 2 and continue monitoring for new requests.

---

## Response Data Formats

### Evaluate Response

```json
{
  "score": 85,
  "feedback": "Good implementation! Your solution correctly...",
  "testResults": [
    { "name": "Test 1", "status": "pass" },
    { "name": "Test 2", "status": "fail" }
  ]
}
```

### Hint Response

```json
{
  "hint": "Consider using useCallback to memoize your functions..."
}
```

### Answer Response

```json
{
  "explanation": "The key insight is to use functional updates...",
  "code": "function useToggle(initialValue = false) {\n  // Complete solution\n}"
}
```

### Next Response

```json
{
  "questionNumber": 2,
  "totalQuestions": 5,
  "question": {
    "title": "useFetch Custom Hook",
    "description": "Create a hook that fetches data...",
    "requirements": ["Handle loading state", "Handle errors"],
    "examples": "const { data, loading, error } = useFetch('/api/users');"
  },
  "starterCode": "function useFetch(url) {\n  // Your code here\n}"
}
```

### Chat Response

```json
{
  "message": "Great question! The useCallback hook is used to..."
}
```

### Start Response

```json
{
  "session": {
    "sessionId": "session_20260121060000",
    "topic": "react",
    "difficulty": "medium",
    "questionsPerSession": 5
  },
  "question": { ... },
  "starterCode": "..."
}
```

---

## Quick Commands

While in watch mode, you can use these shortcuts:

| Command | Action |
|---------|--------|
| `check` | Read and process `request.json` |
| `status` | Show current session status |
| `exit` | Exit watch mode |

---

## Notes

- The notebook polls `response.json` every 1.5 seconds
- Keep Antigravity running in the background
- Each request has a unique ID for matching responses
- Response must match the request ID for the notebook to receive it
