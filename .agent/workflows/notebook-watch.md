---
description: Watch for notebook requests using the MCP server
---

1. Start the notebook watching loop by calling `notebook_wait_for_request`.
2. When a request is received (it returns a request object):
   - Analyze the request type (evaluate, hint, answer, etc.)
   - If it's an evaluation request:
     - Call `notebook_evaluate` with the user's code.
     - (Note: `notebook_evaluate` will automatically queue the response to the notebook).
   - If it's a hint request:
     - Call `notebook_hint`.
     - Then use `notebook_respond` to send the generated hint back.
   - If it's a chat request:
     - Call `notebook_chat` with the message.
     - Then use `notebook_respond` to send your reply back.
   - For other requests, use the appropriate tool and then `notebook_respond` if needed.
3. Repeat step 1 to wait for the next request.

This workflow replaces the old file-polling mechanism. You act as the "Brain" processing requests from the notebook.
