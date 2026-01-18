# 🎯 HackerRank Simulator

An AI-powered technical assessment simulator built on Antigravity agent workflows. Practice for HackerRank, LeetCode, and CodeSignal interviews with realistic questions, code evaluation, and progress tracking.

---

## Quick Start

```bash
/practice react medium      # Start a practice session
/answer                     # Get detailed answer to any question
/resume                     # Continue a saved session
/progress                   # View your progress report
```

---

## Features

| Feature | Description |
|---------|-------------|
| 🧠 **AI Question Generation** | Auto-generated questions by topic and difficulty |
| 🔍 **Web Search Integration** | Find real questions from authoritative sources |
| 💻 **Interactive Notebook** | HackerRank-style split-panel coding environment |
| ✅ **Code Evaluation** | AI review + test case execution with scoring |
| 📊 **Progress Tracking** | Score history, trends, and recommendations |
| 💾 **Session Management** | Save, pause, and resume practice sessions |
| 🎨 **Multiple Platforms** | HackerRank, LeetCode, CodeSignal styles |

---

## Modes

### Practice Mode (`/practice`)

Interactive Q&A loop simulating real technical assessments:

```
/practice [topic] [difficulty] [count]

Examples:
  /practice                    # Use defaults from config
  /practice react              # React, default difficulty
  /practice algorithms hard 5  # 5 hard algorithm questions
  /practice javascript --timer # With timer enabled
```

**Flow**:

1. AI generates question → 2. You answer → 3. AI evaluates → 4. See score → 5. Next question

**Commands during practice**:

- `next` - Go to next question
- `skip` - Skip and return later
- `hint` - Get a hint (-10% score)
- `explain` - Show full solution
- `save` - Pause and save session
- `end` - Finish session

---

### Answer Mode (`/answer`)

Get detailed, teaching-style answers to any question:

```
/answer
[Paste question text or screenshot]
```

**Response includes**:

- Understanding the problem
- Step-by-step approach
- Complete solution code
- Complexity analysis
- Related topics & resources

All Q&As archived to `archive/{topic}/` for future reference.

---

### Progress Mode (`/progress`)

View comprehensive analytics:

```
/progress           # Full report
/progress summary   # Quick stats
/progress tokens    # Token usage
```

**Reports include**:

- Overall statistics
- Topic breakdown
- Difficulty progression
- Score trends
- Smart recommendations
- Token consumption analysis

---

## Configuration

Edit `config.json` to customize defaults:

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

### Settings Reference

| Setting | Options | Description |
|---------|---------|-------------|
| `topics` | Array of strings | Available practice topics |
| `difficulty` | `easy`, `medium`, `hard` | Default difficulty |
| `questionsPerSession` | Number | Questions per session |
| `scoringStrictness` | `lenient`, `balanced`, `strict` | How strictly to grade |
| `theme` | `dark`, `light` | Notebook UI theme |
| `language` | `javascript`, `typescript`, `python` | Preferred language |
| `platformStyle` | `hackerrank`, `leetcode`, `codesignal` | Question format |
| `timeLimit.enabled` | Boolean | Enable countdown timer |

---

## Supported Topics

- **React**: Hooks, components, state, effects, patterns
- **JavaScript**: ES6+, closures, async, DOM, patterns
- **TypeScript**: Types, generics, interfaces, utility types
- **Algorithms**: Arrays, strings, trees, graphs, DP
- **CSS/HTML**: Layouts, flexbox, grid, accessibility
- **SQL**: Queries, joins, aggregations (coming soon)

---

## Scoring System

### Score Breakdown

| Component | Weight (Balanced) |
|-----------|-------------------|
| Test Cases | 60% |
| Code Quality | 15% |
| Approach | 20% |
| Complexity | 5% |

### Strictness Levels

| Level | Description |
|-------|-------------|
| **Lenient** | Focus on learning, generous partial credit |
| **Balanced** | Fair scoring, minor issues tolerated |
| **Strict** | Exam-like, exact output required |

---

## Project Structure

```
NBReact/
├── config.json                 # Settings
├── README.md                   # This file
│
├── .agent/
│   ├── workflows/
│   │   ├── practice.md        # /practice workflow
│   │   ├── answer.md          # /answer workflow
│   │   ├── resume.md          # /resume workflow
│   │   └── progress.md        # /progress workflow
│   │
│   ├── rules/
│   │   ├── platform-format.md # Formatting rules
│   │   └── evaluation.md      # Scoring rules
│   │
│   └── skills/hackerrank-sim/
│       ├── SKILL.md           # Main skill definition
│       ├── templates/         # HTML notebook, question templates
│       ├── scripts/           # test-runner, progress-tracker
│       ├── examples/          # Sample questions
│       └── *.md               # Documentation
│
├── practice/
│   ├── sessions/              # Saved sessions
│   └── current/               # Active session
│
├── archive/                   # Answer mode archives
│   ├── react/
│   ├── algorithms/
│   └── javascript/
│
├── progress/
│   ├── history.json           # Score history
│   ├── token-usage.json       # Token tracking
│   └── analytics.md           # Generated reports
│
└── notebook/
    └── current.html           # Generated interactive notebook
```

---

## Interactive Notebook

For coding questions, an HTML notebook is generated with:

- **Left Panel**: Problem description (scrollable)
- **Right Panel Top**: Monaco code editor with syntax highlighting
- **Right Panel Bottom**: Test case selector, output viewer
- **Header**: Timer, navigation, submit button

Open `notebook/current.html` in a browser to use.

---

## Token Efficiency

The system is optimized for token efficiency:

- Template-based question generation
- Incremental progress updates
- Cached statistics
- Efficient prompt structures

Monitor usage with `/progress tokens`.

---

## Self-Verification

All operations include built-in verification:

- ✓ Question format validation
- ✓ Test case execution confirmation
- ✓ Score calculation accuracy
- ✓ File creation verification
- ✓ Progress update confirmation

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `/practice` | Start practice session |
| `/practice [topic] [diff] [n]` | Custom practice session |
| `/answer` | Answer mode (paste question) |
| `/resume` | Resume saved session |
| `/resume latest` | Resume most recent |
| `/progress` | Full progress report |
| `/progress tokens` | Token usage report |
| `/sessions` | List all saved sessions |

---

## Architecture

This project uses **Antigravity agent workflows**:

1. **Workflows** (`.agent/workflows/`) - Step-by-step processes triggered by commands
2. **Rules** (`.agent/rules/`) - Persistent behavior guidelines
3. **Skills** (`.agent/skills/`) - Complex capabilities with resources

The AI follows these definitions to execute each command consistently.

---

## Background

Built to prepare for technical interviews based on this scenario:

> *"The next step of our recruitment process is some technical exercises. The assessment has a total of 5 questions with a time frame of 90-120 minutes. This is our general assessment; the questions cover a range of technologies; we do not expect candidates to demonstrate expertise in all areas."*

Practice realistically before the real test!

---

## License

Personal use for interview preparation.

---

## Getting Started

1. Run `/practice` to start your first session
2. Answer questions in the format provided
3. Review your score and feedback
4. Check `/progress` to see your improvements
5. Use `/answer` when you need help with a specific question

Good luck with your interviews! 🚀
