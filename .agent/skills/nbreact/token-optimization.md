# Token Optimization Guidelines

Best practices for minimizing token consumption while maintaining quality.

---

## Efficient Prompt Patterns

### Question Generation

```
❌ Avoid: "Generate a comprehensive HackerRank-style question with..."
✅ Prefer: "Generate {difficulty} {topic} question. Format: [template]"
```

### Evaluation

```
❌ Avoid: Full re-analysis of problem + solution each time
✅ Prefer: Focused evaluation on specific criteria
```

### Context Management

```
❌ Avoid: Loading entire session history for each question
✅ Prefer: Load only current question context + summary stats
```

---

## Token Budget Guidelines

| Operation             | Target Budget |
| --------------------- | ------------- |
| Question Generation   | 200-400       |
| User Answer Analysis  | 150-300       |
| Evaluation + Feedback | 300-500       |
| Progress Report       | 200-350       |
| Answer Mode Response  | 400-800       |

---

## Optimization Techniques

### 1. Template-Based Generation

Pre-define question templates to reduce generation overhead.

### 2. Incremental Updates

Update only changed data, not full file rewrites.

### 3. Cached Statistics

Pre-calculate common statistics, update incrementally.

### 4. Compact Formats

Use JSON for data, expand only for display.

### 5. Lazy Loading

Load detailed data only when needed.

---

## Monitoring

Track after each session:

```javascript
{
  "sessionId": "...",
  "questionsAsked": 5,
  "estimatedTokens": 1500,
  "tokensPerQuestion": 300
}
```

Alert if exceeding 500 tokens/question average.

---

## Weekly Review

Generate optimization report:

- Token usage trend
- High-consumption operations
- Suggested improvements
