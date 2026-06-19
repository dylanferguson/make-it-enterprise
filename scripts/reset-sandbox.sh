#!/bin/sh
set -eu

volume="make-it-enterprise-workspace"

container_ids=$(
  docker ps --all --quiet \
    --filter "label=com.docker.compose.project=make-it-enterprise"
)

if [ -n "$container_ids" ]; then
  # shellcheck disable=SC2086
  docker rm --force $container_ids >/dev/null
fi

docker compose down --remove-orphans

if docker volume inspect "$volume" >/dev/null 2>&1; then
  docker volume rm "$volume"
fi

printf 'Sandbox workspace reset. Run `pnpm sandbox:agent` to reseed it.\n'
