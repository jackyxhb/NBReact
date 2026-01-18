---
description: Resume a previously saved practice session
---

# Resume Session Workflow

**Triggers**: `/resume` or "resume my session"

## Steps

1. **List Available Sessions**
   - Scan `practice/sessions/` directory
   - Display sessions with:
     - Session ID
     - Start date/time
     - Topic(s)
     - Progress (questions completed / total)
     - Last score

2. **User Selects Session**
   - User picks session by ID or number
   - If only one session exists, offer to resume it directly

3. **Load Session State**
   - Read session JSON file
   - Restore configuration
   - Load question history

4. **Continue from Last Question**
   - Display current position (e.g., "Resuming from question 3 of 5")
   - Present the next question
   - Continue practice mode loop

5. **Merge Progress on Completion**
   - Combine session progress with main history
   - Update analytics
   - Delete session file (or archive it)

6. **Self-Verification**
   - Validate session state loaded correctly
   - Verify question continuity
   - Confirm progress merging

## Session Management Commands

- `/sessions` - List all saved sessions
- `/resume [id]` - Resume specific session
- `/delete-session [id]` - Delete a saved session
