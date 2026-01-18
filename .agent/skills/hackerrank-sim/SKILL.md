---
name: HackerRank Simulator
description: Comprehensive skill for simulating HackerRank-style technical assessments with practice mode, answer mode, and progress tracking.
---

# HackerRank Simulator Skill

This skill provides the core capabilities for simulating technical assessment platforms like HackerRank, LeetCode, and CodeSignal.

## Capabilities

### 1. Question Generation

Generate authentic-style questions based on:

- **Topic**: React, JavaScript, TypeScript, Algorithms, CSS, HTML, etc.
- **Difficulty**: Easy, Medium, Hard
- **Platform Style**: HackerRank, LeetCode, CodeSignal, Codility

Question types supported:

- Algorithm/data structure problems
- Frontend component challenges
- Multiple choice conceptual questions
- SQL queries
- API design

### 2. Web Search Integration

Search authoritative sources for real-world questions:

- Official documentation examples
- Common interview question databases
- Technical blogs and tutorials

Always cite sources when using external questions.

### 3. HTML Notebook Generation

Generate interactive coding environment:

- HackerRank-style split-panel layout
- Monaco Editor for code input
- Live JavaScript execution
- Test case runner
- Timer display (optional)

Template located at: `templates/notebook.html`

### 4. Code Evaluation

Evaluate user solutions:

- Static analysis (AI review)
- Dynamic testing (run against test cases)
- Performance benchmarking
- Code quality assessment

### 5. Session Management

Track practice sessions:

- Save session state
- Resume capability
- Progress merging
- History tracking

### 6. Progress Analytics

Generate insights:

- Score trends
- Topic strengths/weaknesses
- Recommendations
- Token usage monitoring

---

## Workflows

This skill is invoked by the following workflows:

- `/practice` - [practice.md](file:///Users/macbook1/work/NBReact/.agent/workflows/practice.md)
- `/answer` - [answer.md](file:///Users/macbook1/work/NBReact/.agent/workflows/answer.md)
- `/resume` - [resume.md](file:///Users/macbook1/work/NBReact/.agent/workflows/resume.md)
- `/progress` - [progress.md](file:///Users/macbook1/work/NBReact/.agent/workflows/progress.md)

---

## Rules Applied

- [platform-format.md](file:///Users/macbook1/work/NBReact/.agent/rules/platform-format.md) - Formatting standards
- [evaluation.md](file:///Users/macbook1/work/NBReact/.agent/rules/evaluation.md) - Scoring criteria

---

## Directory Structure

```
NBReact/
├── config.json              # Settings
├── practice/
│   ├── sessions/           # Saved sessions
│   └── current/            # Active session
├── archive/                # Answer mode archives
│   └── {topic}/           # Organized by topic
├── progress/
│   ├── history.json       # Score history
│   ├── analytics.md       # Reports
│   └── token-usage.json   # Token tracking
└── notebook/
    └── current.html       # Active notebook
```

---

## Configuration

Settings in `config.json`:

```json
{
  "topics": ["react", "javascript", "algorithms"],
  "difficulty": "medium",
  "questionsPerSession": 5,
  "scoringStrictness": "balanced",
  "theme": "dark",
  "language": "javascript",
  "platformStyle": "hackerrank",
  "timeLimit": {
    "enabled": false,
    "easy": 15,
    "medium": 30,
    "hard": 45
  }
}
```

Override per session: `/practice react hard 3` (topic, difficulty, count)

---

## Self-Verification

All operations include built-in verification:

- Question format validation
- Test case execution confirmation
- Score calculation accuracy
- File creation verification
- Progress update confirmation

---

## Token Efficiency

Minimize token usage by:

- Concise prompts
- Avoiding redundant context
- Incremental updates vs full rewrites
- Efficient file operations
