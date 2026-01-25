---
name: NBReact
description: AI-Powered Notebook for Frontend Developers - practice coding, get answers, track progress.
---

# NBReact Skill

AI-Powered Notebook for Frontend Developers. Practice React, JavaScript, and frontend development with interactive challenges and intelligent feedback.

---

## Quick Start

| Command                  | Description                             |
| ------------------------ | --------------------------------------- |
| `/practice react medium` | Start React practice, medium difficulty |
| `/answer`                | Get detailed answer to a question       |
| `/resume`                | Continue saved session                  |
| `/progress`              | View progress report                    |

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

- Split-panel coding environment
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

---

## Workflows

| Workflow       | File                                                                                        | Trigger           |
| -------------- | ------------------------------------------------------------------------------------------- | ----------------- |
| Practice       | [practice.md](file:///Users/macbook1/work/NBReact/.agent/workflows/practice.md)             | `/practice`       |
| Answer         | [answer.md](file:///Users/macbook1/work/NBReact/.agent/workflows/answer.md)                 | `/answer`         |
| Resume         | [resume.md](file:///Users/macbook1/work/NBReact/.agent/workflows/resume.md)                 | `/resume`         |
| Progress       | [progress.md](file:///Users/macbook1/work/NBReact/.agent/workflows/progress.md)             | `/progress`       |
| Notebook Watch | [notebook-watch.md](file:///Users/macbook1/work/NBReact/.agent/workflows/notebook-watch.md) | `/notebook-watch` |

---

## Rules

| Rule                                                                                      | Purpose             |
| ----------------------------------------------------------------------------------------- | ------------------- |
| [platform-format.md](file:///Users/macbook1/work/NBReact/.agent/rules/platform-format.md) | Question formatting |
| [evaluation.md](file:///Users/macbook1/work/NBReact/.agent/rules/evaluation.md)           | Scoring criteria    |

---

## Resources

### Templates

- `templates/notebook.html` - Basic interactive editor
- `templates/notebook-interactive.html` - Enhanced notebook with chat panel
- `templates/question-templates.md` - Question formats

### Scripts

- `scripts/test-runner.js` - Execute test cases
- `scripts/progress-tracker.js` - Analytics
- `scripts/notebook-generator.js` - Generate HTML
- `scripts/bridge-server.js` - HTTP bridge for notebook ↔ AI communication

### Documentation

- `session-manager.md` - Session handling
- `evaluation-engine.md` - Scoring logic
- `verification-tests.md` - Test suite
- `token-optimization.md` - Efficiency

---

## Interactive Notebook Mode

For real-time AI interaction from the notebook:

1. **Start bridge server**: `node .agent/skills/nbreact/scripts/bridge-server.js`
2. **Open notebook**: `http://localhost:3456/notebook`
3. **Start watching**: Run `/notebook-watch` in Antigravity

The notebook communicates via `request.json` and `response.json` files.

---

## Data Locations

```
NBReact/
├── config.json           # Settings
├── practice/sessions/    # Saved sessions
├── archive/{topic}/      # Q&A archives
├── progress/             # Analytics data
└── notebook/             # Generated notebooks
```

---

## Configuration

Edit `config.json` for defaults. Override per session with command arguments.
