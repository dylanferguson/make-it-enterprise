#!/bin/sh
set -eu

docker compose config --quiet

docker compose run --rm -T agent sh -lc '
  set -eu

  test ! -e /Users/dylan/dev/make-it-enterprise
  test ! -e /var/run/docker.sock
  test -z "$(git remote)"

  mount_options=$(findmnt -no OPTIONS /tmp)
  case ",$mount_options," in
    *,noexec,*)
      printf "OpenCode requires an executable /tmp mount.\n" >&2
      exit 1
      ;;
  esac

  set +e
  timeout 3 script -qec "opencode /workspace" /dev/null \
    >/tmp/opencode-tui-smoke.log 2>&1
  status=$?
  set -e

  if [ "$status" -ne 124 ]; then
    cat /tmp/opencode-tui-smoke.log >&2
    exit 1
  fi
'

printf 'Sandbox isolation and OpenCode TUI startup verified.\n'
