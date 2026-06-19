#!/bin/sh
set -eu

# Copies the agent's working copy out of the isolated sandbox volume onto the
# host so it can be inspected or kept. The full .git iteration history is
# included; node_modules and the runtime seed marker are omitted. The sandbox
# itself is never modified.

volume="make-it-enterprise-workspace"
dest="${1:-.sandbox-export}"

case "$dest" in
  "" | / | . | ..)
    printf 'Refusing to export to "%s".\n' "$dest" >&2
    exit 1
    ;;
esac

if ! docker volume inspect "$volume" >/dev/null 2>&1; then
  printf 'No sandbox workspace to export yet. Run `pnpm sandbox:loop` first.\n' >&2
  exit 1
fi

rm -rf "$dest"
mkdir -p "$dest"
dest_abs=$(cd "$dest" && pwd)

docker compose run --rm -T \
  --entrypoint sh \
  --volume "${dest_abs}:/export" \
  agent -c '
    cd /workspace
    find . -mindepth 1 -maxdepth 1 \
      ! -name node_modules \
      ! -name .sandbox-seeded \
      -exec cp -a {} /export/ \;
  '

printf 'Exported sandbox workspace to %s\n' "$dest"
printf '(full .git iteration history included; node_modules omitted)\n'
