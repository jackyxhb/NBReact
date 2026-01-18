---
name: HackerRank Simulator
description: Comprehensive skill for simulating HackerRank-style technical assessments with practice mode, answer mode, and progress tracking.
---

# HackerRank Simulator Skill

Simulate technical assessment platforms like HackerRank, LeetCode, and CodeSignal for interview preparation.

---

## Quick Start

| Command | Description |
|---------|-------------|
| `/practice react medium` | Start React practice, medium difficulty |
| `/answer` | Get detailed answer to a question |
| `/resume` | Continue saved session |
| `/progress` | View progress report |

---

## Capabilities

### 1. Question Generation

- AI-generated questions by topic and difficulty
- Web search for real-world questions
- Multiple formats: coding, MCQ, React components

### 2. Code Evaluation

- Static analysis (AI review)
- Dynamic testing (run test cases)
- Detailed scoring with breakdown

### 3. Interactive Notebook

- HackerRank-style split-panel UI
- Monaco Editor with syntax highlighting
- Live JavaScript execution
- Test case runner

### 4. Session Management

- Save/resume sessions
- Track question progress
- Maintain score history

### 5. Progress Analytics

- Topic performance breakdown
- Difficulty progression
- Improvement trends
- Smart recommendations

### 6. Token Optimization

- Efficient prompt design
- Usage monitoring
- Weekly reports

---

## Workflows

| Workflow | File | Trigger |
|----------|------|---------|
| Practice | [practice.md](file:///Users/macbook1/work/NBReact/.agent/workflows/practice.md) | `/practice` |
| Answer | [answer.md](file:///Users/macbook1/work/NBReact/.agent/workflows/answer.md) | `/answer` |
| Resume | [resume.md](file:///Users/macbook1/work/NBReact/.agent/workflows/resume.md) | `/resume` |
| Progress | [progress.md](file:///Users/macbook1/work/NBReact/.agent/workflows/progress.md) | `/progress` |

---

## Rules

| Rule | Purpose |
|------|---------|
| [platform-format.md](file:///Users/macbook1/work/NBReact/.agent/rules/platform-format.md) | HackerRank/LeetCode formatting |
| [evaluation.md](file:///Users/macbook1/work/NBReact/.agent/rules/evaluation.md) | Scoring criteria |

---

## Resources

### Templates

- [notebook.html](file:///Users/macbook1/work/NBReact/.agent/skills/hackerrank-sim/templates/notebook.html) - Interactive editor
- [question-templates.md](file:///Users/macbook1/work/NBReact/.agent/skills/hackerrank-sim/templates/question-templates.md) - Question formats

### Scripts

- [test-runner.js](file:///Users/macbook1/work/NBReact/.agent/skills/hackerrank-sim/scripts/test-runner.js) - Execute test cases
- [progress-tracker.js](file:///Users/macbook1/work/NBReact/.agent/skills/hackerrank-sim/scripts/progress-tracker.js) - Analytics
- [notebook-generator.js](file:///Users/macbook1/work/NBReact/.agent/skills/hackerrank-sim/scripts/notebook-generator.js) - Generate HTML

### Documentation

- [session-manager.md](file:///Users/macbook1/work/NBReact/.agent/skills/hackerrank-sim/session-manager.md) - Session handling
- [evaluation-engine.md](file:///Users/macbook1/work/NBReact/.agent/skills/hackerrank-sim/evaluation-engine.md) - Scoring logic
- [verification-tests.md](file:///Users/macbook1/work/NBReact/.agent/skills/hackerrank-sim/verification-tests.md) - Test suite
- [token-optimization.md](file:///Users/macbook1/work/NBReact/.agent/skills/hackerrank-sim/token-optimization.md) - Efficiency

### Examples

- [sample-questions.md](file:///Users/macbook1/work/NBReact/.agent/skills/hackerrank-sim/examples/sample-questions.md) - Reference questions

---

## Data Locations

```
NBReact/
├── config.json           # Settings
├── practice/
│   ├── sessions/        # Saved sessions
│   └── current/         # Active session
├── archive/{topic}/     # Answer archives
├── progress/
│   ├── history.json     # Score history
│   ├── token-usage.json # Token tracking
│   └── analytics.md     # Reports
└── notebook/
    └── current.html     # Active notebook
```

---

## Configuration

Edit `config.json`:

```json
{
  "topics": ["react", "javascript", "algorithms"],
  "difficulty": "medium",
  "questionsPerSession": 5,
  "scoringStrictness": "balanced",
  "theme": "dark",
  "language": "javascript",
  "platformStyle": "hackerrank"
}
```

Override per session: `/practice react hard 3`

---

## Self-Verification

Built-in checks before each response:

- Question format valid
- Test cases executable
- Score calculated correctly
- Files created successfully
- Progress updated
