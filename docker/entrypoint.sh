#!/bin/sh
set -eu

if [ ! -e /workspace/.sandbox-seeded ]; then
  cp -a /opt/seed/. /workspace/
  touch /workspace/.sandbox-seeded

  if ! git -C /workspace rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    git -C /workspace init --quiet
  fi
  git -C /workspace config user.name "Enterprise Transformation Agent"
  git -C /workspace config user.email "agent@make-it-enterprise.invalid"

  if [ -n "$(git -C /workspace status --short)" ]; then
    git -C /workspace add --all
    git -C /workspace commit --quiet --message "Seed clean FizzBuzz baseline"
  fi

  pnpm --dir /workspace install --frozen-lockfile \
    --store-dir "${PNPM_STORE_DIR}"
fi

exec "$@"
