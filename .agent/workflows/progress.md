---
description: View practice progress, analytics, and recommendations
---

# Progress Report Workflow

**Triggers**: `/progress` or "show my progress"

## Steps

1. **Load History Data**
   - Read `progress/history.json`
   - Read `progress/token-usage.json`
   - Gather archive statistics

2. **Calculate Statistics**

   ### Overall Stats

   - Total questions attempted
   - Total sessions completed
   - Average score
   - Time spent practicing

   ### By Topic

   - Questions per topic
   - Average score per topic
   - Identify strongest topics
   - Identify weakest topics

   ### By Difficulty

   - Breakdown by Easy/Medium/Hard
   - Score distribution

   ### Trends

   - Score improvement over time
   - Topic coverage trends
   - Practice frequency

3. **Token Consumption Report**
   - Total tokens used
   - Average tokens per session
   - Average tokens per question
   - Trending analysis (increasing/decreasing)
   - Optimization recommendations

4. **Generate Recommendations**
   - Topics needing more practice (weak areas)
   - Suggested difficulty adjustments
   - Recommended question types
   - Practice frequency suggestions

5. **Display Report**
   Format as comprehensive markdown with:
   - Summary dashboard
   - Detailed breakdowns
   - Visual indicators (progress bars using text)
   - Actionable recommendations

6. **Save Analytics**
   - Update `progress/analytics.md` with latest report
   - Log report generation

7. **Self-Verification**
   - Validate statistics accuracy
   - Confirm trend calculations
   - Verify recommendations are relevant

## Report Format

```markdown
# Practice Progress Report

**Generated**: YYYY-MM-DD HH:MM

## 📊 Overview
| Metric | Value |
|--------|-------|
| Total Questions | XX |
| Average Score | XX% |
| Sessions | XX |

## 📈 Score Trend
[Text-based trend visualization]

## 🎯 Topic Breakdown
| Topic | Questions | Avg Score | Status |
|-------|-----------|-----------|--------|
| React | 15 | 82% | ✅ Strong |
| Algorithms | 8 | 65% | ⚠️ Needs Work |

## 💡 Recommendations
1. Focus on: [weak topics]
2. Try harder difficulty in: [strong topics]
3. Practice more: [underrepresented topics]

## 🔢 Token Usage
| Period | Tokens | Avg/Question |
|--------|--------|--------------|
| This Week | XXXX | XXX |
| Last Week | XXXX | XXX |
```
