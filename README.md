# 🎯 NBReact

**AI-Powered Notebook for Frontend Developers**

An intelligent practice and learning environment built on Antigravity agent workflows. Master React, JavaScript, and frontend development through interactive coding challenges, AI-powered evaluation, and personalized progress tracking.

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Desktop App**: Tauri v2 (Rust)
- **Editor**: Monaco Editor (VS Code core)
- **State Management**: React Hooks & Context
- **Architecture**: Local-first, Agentic AI integrated

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

| Feature                       | Description                                               |
| ----------------------------- | --------------------------------------------------------- |
| 🧠 **AI Question Generation** | Auto-generated questions by topic and difficulty          |
| 🔍 **Web Search Integration** | Find real questions from authoritative sources            |
| 💻 **Desktop Experience**     | Native performance with deeper system integration (Tauri) |
| 📝 **Interactive Notebook**   | Split-panel coding environment with live execution        |
| ✅ **Code Evaluation**        | AI review + test case execution with scoring              |
| 📊 **Progress Tracking**      | Score history, trends, and recommendations                |
| 💾 **Session Management**     | Save, pause, and resume practice sessions                 |
| 🎨 **Multiple Styles**        | HackerRank, LeetCode, CodeSignal formats                  |

---

## Modes

### Practice Mode (`/practice`)

Interactive Q&A loop for skill building:

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

### Notebook Watch Mode (`/notebook-watch`)

Enable AI interactions directly from the notebook web page:

```
/notebook-watch    # Start watching for notebook requests
```

**Supported Actions** (triggered from notebook UI):

| Action     | Description                       |
| ---------- | --------------------------------- |
| `evaluate` | Submit and score your solution    |
| `hint`     | Get a helpful hint                |
| `answer`   | Show complete solution            |
| `next`     | Move to next question             |
| `chat`     | Ask questions about the problem   |
| `start`    | Begin a new session from notebook |

The notebook polls the AI every 1.5 seconds for responses.

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
  "platformStyle": "hackerrank"
}
```

### Settings Reference

| Setting               | Options                                | Description               |
| --------------------- | -------------------------------------- | ------------------------- |
| `topics`              | Array of strings                       | Available practice topics |
| `difficulty`          | `easy`, `medium`, `hard`               | Default difficulty        |
| `questionsPerSession` | Number                                 | Questions per session     |
| `scoringStrictness`   | `lenient`, `balanced`, `strict`        | How strictly to grade     |
| `theme`               | `dark`, `light`                        | Notebook UI theme         |
| `language`            | `javascript`, `typescript`, `python`   | Preferred language        |
| `platformStyle`       | `hackerrank`, `leetcode`, `codesignal` | Question format           |

---

## Frontend Topics

| Topic          | Coverage                                                 |
| -------------- | -------------------------------------------------------- |
| **React**      | Hooks, components, state, effects, patterns, performance |
| **JavaScript** | ES6+, closures, async/await, DOM, event loop             |
| **TypeScript** | Types, generics, interfaces, utility types               |
| **CSS**        | Flexbox, Grid, animations, responsive design             |
| **HTML**       | Semantic markup, accessibility, forms                    |
| **Algorithms** | Arrays, strings, trees, common interview problems        |

---

## Scoring System

| Component    | Weight |
| ------------ | ------ |
| Test Cases   | 60%    |
| Code Quality | 15%    |
| Approach     | 20%    |
| Complexity   | 5%     |

**Strictness Levels**: Lenient (learning-focused) → Balanced → Strict (exam-like)

---

## 👨‍💻 Development

### Prerequisites

- **Node.js** (v18+)
- **Rust & Cargo** (for Tauri)

### Setup & Run

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run in Browser Mode** (Frontend only):

   ```bash
   npm run dev
   ```

3. **Run in Desktop Mode** (Tauri app):

   ```bash
   npm run tauri dev
   ```

---

## 📂 Project Structure

```
NBReact/
├── src/                        # React Frontend Application
│   ├── components/             # UI Components
│   ├── hooks/                  # Custom React Hooks
│   ├── App.tsx                 # Main Application Component
│   └── main.tsx                # Entry Point
│
├── src-tauri/                  # Rust Backend (Tauri)
│   ├── src/                    # Rust Source Code
│   ├── taura.conf.json         # Tauri Configuration
│   └── Cargo.toml              # Rust Dependencies
│
├── config.json                 # User Settings
├── README.md                   # This file
│
├── .agent/                     # Agentic AI Configuration
│   ├── workflows/              # Agent Workflows
│   ├── rules/                  # Evaluation Rules
│   └── skills/                 # Agent Skills
│
├── practice/sessions/          # Saved Sessions
├── archive/                    # Q&A Archives
└── progress/                   # User Progress Data
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

## Architecture

Built on **Antigravity agent workflows**:

1. **Workflows** - Step-by-step processes (`/practice`, `/answer`, etc.)
2. **Rules** - Consistent behavior guidelines
3. **Skills** - Complex capabilities with templates & scripts

The AI follows these definitions to execute each command consistently.

---

## Commands Reference

| Command                        | Description                         |
| ------------------------------ | ----------------------------------- |
| `/practice`                    | Start practice session              |
| `/practice [topic] [diff] [n]` | Custom session                      |
| `/answer`                      | Get answer to a question            |
| `/resume`                      | Resume saved session                |
| `/progress`                    | View progress report                |
| `/notebook-watch`              | Enable AI interaction from notebook |
| `/sessions`                    | List saved sessions                 |

---

## Getting Started

1. Run `/practice` to start your first session
2. Answer questions in the format provided
3. Review your score and feedback
4. Check `/progress` to see improvements
5. Use `/answer` for help with specific questions

**Happy learning!** 🚀
