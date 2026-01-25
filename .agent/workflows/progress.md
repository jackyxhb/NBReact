---
description: View practice progress, analytics, and recommendations
---

# Progress Report Workflow

**Triggers**: `/progress` or "show my progress"

## Quick Start

```
/progress                  # Full progress report
/progress summary          # Quick summary only
/progress [topic]          # Stats for specific topic
/progress tokens           # Token usage report
```

---

## Complete Workflow Steps

### Step 1: Load Data

// turbo

```javascript
// Load all progress data
const history = require('./progress/history.json');
const tokenUsage = require('./progress/token-usage.json');
const sessions = fs.readdirSync('practice/sessions/');
const archives = countArchiveFiles();
```

---

### Step 2: Calculate Statistics

**Overall Stats**:

```javascript
const stats = {
  totalQuestions: history.totalQuestions,
  totalSessions: history.totalSessions,
  overallAverage: calculateOverallAverage(history),
  totalTimeSpent: calculateTotalTime(history),
  streakDays: calculateStreak(history),
};
```

**Topic Breakdown**:

```javascript
const topicStats = Object.entries(history.topicStats)
  .map(([topic, data]) => ({
    topic,
    attempted: data.attempted,
    avgScore: data.avgScore,
    status: data.avgScore >= 80 ? 'strong' : data.avgScore >= 60 ? 'ok' : 'weak',
  }))
  .sort((a, b) => b.attempted - a.attempted);
```

**Difficulty Breakdown**:

```javascript
const difficultyStats = Object.entries(history.difficultyStats).map(([level, data]) => ({
  level,
  attempted: data.attempted,
  avgScore: data.attempted > 0 ? Math.round(data.totalScore / data.attempted) : 0,
}));
```

---

### Step 3: Analyze Trends

**Score Trend**:

```javascript
const recentScores = history.sessions.slice(-10).map((s) => s.averageScore);

const trendDirection = analyzeTrend(recentScores);
// 'improving' | 'stable' | 'declining'
```

**Activity Pattern**:

```javascript
const activityByDay = groupByDay(history.sessions);
const mostActiveDay = findMostActive(activityByDay);
```

---

### Step 4: Generate Recommendations

```javascript
const recommendations = [];

// Weak areas
const weakTopics = topicStats.filter((t) => t.status === 'weak');
if (weakTopics.length > 0) {
  recommendations.push({
    type: 'focus',
    message: `Focus on: ${weakTopics.map((t) => t.topic).join(', ')}`,
    priority: 'high',
  });
}

// Difficulty progression
if (difficultyStats.easy.avgScore >= 85 && difficultyStats.medium.attempted < 5) {
  recommendations.push({
    type: 'challenge',
    message: 'Ready for more medium difficulty questions!',
    priority: 'medium',
  });
}

// Practice frequency
const daysSinceLastPractice = calculateDaysSince(history.lastUpdated);
if (daysSinceLastPractice > 3) {
  recommendations.push({
    type: 'consistency',
    message: 'Regular practice helps retention. Try a quick session!',
    priority: 'low',
  });
}
```

---

### Step 5: Display Report

````markdown
---
# 📊 Practice Progress Report
**Generated**: January 19, 2026 at 4:30 PM

---

## 🎯 Overview

| Metric          | Value     |
| --------------- | --------- |
| Total Questions | 47        |
| Total Sessions  | 12        |
| Average Score   | 78%       |
| Practice Streak | 5 days 🔥 |

---

## 📈 Score Trend

```
Last 10 sessions:
  90 ┤                    ╭──
  80 ┤        ╭───╮   ╭──╯
  70 ┤   ╭────╯   ╰───╯
  60 ┤───╯
     └──────────────────────
        Oldest → Recent

Trend: 📈 Improving (+8% over last 5 sessions)
```

---

## 🏷️ By Topic

| Topic      | Questions | Avg Score | Status        |
| ---------- | --------- | --------- | ------------- |
| React      | 18        | 82%       | ✅ Strong     |
| JavaScript | 15        | 75%       | ➖ Ok         |
| Algorithms | 10        | 68%       | ⚠️ Needs Work |
| TypeScript | 4         | 85%       | ✅ Strong     |

---

## 📊 By Difficulty

| Level  | Questions | Avg Score |
| ------ | --------- | --------- |
| Easy   | 20        | 88%       |
| Medium | 22        | 74%       |
| Hard   | 5         | 62%       |

---

## 💡 Recommendations

> **🎯 Priority: Focus on Algorithms**
> Your algorithm scores are below 70%. Try 3-5 easy algorithm questions to build confidence.

> **📈 Challenge Yourself**
> You're doing great on easy questions (88%)! Ready to tackle more medium-level challenges.

> **🔄 Consistency**
> Great 5-day streak! Keep the momentum going.

---

## 🔢 Token Usage (This Week)

| Metric           | Value  |
| ---------------- | ------ |
| Total Tokens     | 12,450 |
| Avg per Session  | 1,038  |
| Avg per Question | 265    |

**Trend**: Stable (no optimization needed)

---

## 📁 Archive Stats

| Category   | Questions Saved |
| ---------- | --------------- |
| React      | 8               |
| JavaScript | 5               |
| Algorithms | 3               |

---

_Next report generated automatically after 5 more sessions, or run `/progress` anytime._
````

---

### Step 6: Save Report

// turbo

```javascript
// Save analytics snapshot
const reportPath = 'progress/analytics.md';
fs.writeFileSync(reportPath, reportMarkdown);
```

---

## Token Usage Report (Detailed)

When `/progress tokens` is called:

```markdown
## 🔢 Token Consumption Report

### Weekly Summary

| Week        | Questions | Tokens | Avg/Question |
| ----------- | --------- | ------ | ------------ |
| Current     | 12        | 3,200  | 267          |
| Last Week   | 18        | 4,500  | 250          |
| 2 Weeks Ago | 8         | 2,100  | 263          |

### Trend Analysis

Token usage per question: **Stable** (~260 tokens)

### Breakdown by Mode

| Mode     | Tokens | %   |
| -------- | ------ | --- |
| Practice | 8,500  | 68% |
| Answer   | 3,700  | 30% |
| Progress | 250    | 2%  |

### Optimization Status

✅ No optimization needed - usage is efficient

### Tips

- Using `/answer` for quick lookups uses fewer tokens than full practice sessions
- Complex questions use more tokens - this is expected
```

---

## Self-Verification

- [ ] All statistics calculated correctly
- [ ] Trend analysis accurate
- [ ] Recommendations relevant to user's data
- [ ] Report saves successfully
