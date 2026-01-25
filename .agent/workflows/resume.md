---
description: Resume a previously saved practice session
---

# Resume Session Workflow

**Triggers**: `/resume` or "resume my session"

## Quick Start

```
/resume                    # List sessions, pick one
/resume latest             # Resume most recent session
/resume [session-id]       # Resume specific session
```

---

## Complete Workflow Steps

### Step 1: List Available Sessions

// turbo

```bash
# List session files
ls -la practice/sessions/*.json
```

**Display Format**:

```markdown
## 📂 Saved Sessions

| #   | Date   | Topic      | Progress | Score | Status   |
| --- | ------ | ---------- | -------- | ----- | -------- |
| 1   | Jan 19 | React      | 3/5      | 82%   | Paused   |
| 2   | Jan 18 | Algorithms | 2/5      | 70%   | Paused   |
| 3   | Jan 17 | JavaScript | 5/5      | 88%   | Complete |

Enter session number to resume (or 'latest'):
```

---

### Step 2: Load Session

// turbo

```javascript
// Load selected session
const session = JSON.parse(fs.readFileSync(`practice/sessions/${sessionId}.json`));

// Validate session
if (session.status === 'completed') {
  console.log('This session is already complete. Start a new one?');
  return;
}

// Set to active
session.status = 'active';
session.updatedAt = new Date().toISOString();
```

---

### Step 3: Display Resume Point

```markdown
## 🔄 Resuming Session

**Session**: {topic} practice ({date})
**Progress**: Question {current} of {total}
**Current Score**: {avgScore}%
**Time Elapsed**: {timeSpent}

### Previous Questions:

| Q#  | Title   | Score |
| --- | ------- | ----- |
| 1   | Two Sum | 85%   |
| 2   | Counter | 90%   |

---

Ready to continue! Presenting question {current}...
```

---

### Step 4: Continue Practice Loop

Return to Practice Mode workflow Step 2 (Generate/Present Question)

Continue from `session.currentQuestion`

---

### Step 5: Handle Completion

When session ends:

```javascript
// Mark complete
session.status = 'completed';

// Calculate final stats
session.finalScore = session.totalScore / session.questions.length;

// Merge to main history
recordSession(session);

// Archive or cleanup
archiveSession(session);
```

---

## Session Management Commands

| Command                | Description                   |
| ---------------------- | ----------------------------- |
| `/sessions`            | List all sessions             |
| `/resume`              | Resume workflow               |
| `/resume latest`       | Resume most recent            |
| `/delete-session [id]` | Delete session                |
| `/archive-sessions`    | Archive all complete sessions |

---

## Edge Cases

**No Saved Sessions**:

```markdown
No saved sessions found. Start a new practice session with `/practice`
```

**Corrupted Session**:

```markdown
Unable to load session. The file may be corrupted.
Would you like to:

1. Delete this session and start fresh
2. Try to recover partial data
```

**Session Too Old (>7 days)**:

```markdown
This session is from {date} ({X days ago}).
Continue anyway? (Some context may be lost)
```
