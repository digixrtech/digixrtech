#!/bin/bash
# PostToolUse hook: remind to run /perf-check after canvas file edits
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ "$FILE_PATH" =~ src/lib/canvas/.*\.ts$ ]]; then
  echo "⚠️ Canvas file edited: $FILE_PATH — run /perf-check before committing."
fi

exit 0
