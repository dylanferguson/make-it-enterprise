#!/bin/sh
set -u

cd /workspace

model="${OPENCODE_MODEL:-opencode/deepseek-v4-flash}"
delay="${ENTERPRISE_DELAY_SECONDS:-10}"
max_iterations="${MAX_ITERATIONS:-0}"
iteration=1

prompt=$(cat /workspace/prompts/make-it-enterprise.txt)

while [ "$max_iterations" -eq 0 ] || [ "$iteration" -le "$max_iterations" ]; do
  printf '\n=== Enterprise iteration %s [%s] ===\n\n' "$iteration" "$model"

  if opencode run --model "$model" "$prompt"; then
    agent_status="completed"
  else
    agent_status="failed"
  fi

  if pnpm test && pnpm typecheck; then
    verification_status="verified"
  else
    verification_status="verification-failed"
  fi

  if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    git add --all
    git commit --allow-empty \
      --message "Enterprise iteration ${iteration} [${model}]: ${agent_status}, ${verification_status}"
  fi

  iteration=$((iteration + 1))

  if [ "$max_iterations" -eq 0 ] || [ "$iteration" -le "$max_iterations" ]; then
    sleep "$delay"
  fi
done
