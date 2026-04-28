<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Engram Memory

This workspace is configured to use Engram as persistent memory for agents.

- Use `mem_context` at the start of work or after a compaction/context reset.
- Call `mem_search` before starting work that might overlap prior sessions, or when the user asks to recall past work.
- Call `mem_save` immediately after bug fixes, decisions, discoveries, config changes, patterns, or user preferences.
- Use `mem_suggest_topic_key` for evolving topics, and reuse the same `topic_key` when updating them.
- Before ending a session or saying done/listo, call `mem_session_summary` with Goal, Instructions, Discoveries, Accomplished, Next Steps, and Relevant Files.
- After compaction, save the compacted summary first, then call `mem_context`, then continue.
