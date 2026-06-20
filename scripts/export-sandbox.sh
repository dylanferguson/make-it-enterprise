#!/bin/sh
set -eu

# Copies the agent's working copy out of the isolated sandbox volume into the
# result directory tracked by this repository. The nested .git directory,
# node_modules, and the runtime seed marker are omitted. The sandbox itself is
# never modified.

volume="make-it-enterprise-workspace"
dest="${1:-fizzbuzz-enterprise}"

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

readme_backup=""
if [ -f "$dest/README.md" ]; then
  readme_backup=$(mktemp "${TMPDIR:-/tmp}/make-it-enterprise-readme.XXXXXX")
  cp "$dest/README.md" "$readme_backup"
fi

cleanup() {
  if [ -n "$readme_backup" ]; then
    rm -f "$readme_backup"
  fi
}
trap cleanup EXIT

rm -rf "$dest"
mkdir -p "$dest"
dest_abs=$(cd "$dest" && pwd)

docker compose run --rm -T \
  --entrypoint sh \
  --volume "${dest_abs}:/export" \
  agent -c '
    cd /workspace
    find . -mindepth 1 -maxdepth 1 \
      ! -name .git \
      ! -name node_modules \
      ! -name .sandbox-seeded \
      -exec cp -a {} /export/ \;
  '

if [ -n "$readme_backup" ]; then
  cp "$readme_backup" "$dest/README.md"
fi

printf 'Exported sandbox workspace to %s\n' "$dest"
printf '(nested .git and node_modules omitted; result tracked by parent repository)\n'
