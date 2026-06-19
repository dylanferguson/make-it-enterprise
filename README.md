# make-it-enterprise

A clean TypeScript FizzBuzz seed for an AI performance piece about iterative
enterprise degradation.

## Layout

- `seed/` — the subject: a clean TypeScript FizzBuzz project. This is the only
  thing copied into the sandbox and mutated by the agent.
- root — the runner: the disposable Docker sandbox and its helper scripts. The
  agent never sees these files.

## Run FizzBuzz

The project lives in `seed/`:

```sh
cd seed
pnpm install
pnpm test
pnpm build
pnpm start
```

The behavior is intentionally plain: print values from 1 to 100, replacing
multiples of 3 with `Fizz`, multiples of 5 with `Buzz`, and multiples of both
with `FizzBuzz`.

## Run The Agent Safely

The agent runs inside a disposable Docker sandbox. The host repository is not
mounted into the container. Its working copy, OpenCode credentials, and caches
live in isolated Docker volumes.

Build the sandbox:

```sh
pnpm sandbox:build
```

Open OpenCode and connect to OpenCode Zen:

```sh
pnpm sandbox:agent
```

Inside OpenCode, run `/connect`, select OpenCode Zen, and paste the API key.
Then select `DeepSeek V4 Flash Free` with `/models`.

Start the performance loop:

```sh
pnpm sandbox:loop
```

The loop performs one enterprise transformation per iteration, verifies the
project, and commits the result inside the sandbox. Stop it with `Ctrl-C`.

Useful controls:

```sh
# Run exactly five iterations.
MAX_ITERATIONS=5 pnpm sandbox:loop

# Wait 30 seconds between iterations.
ENTERPRISE_DELAY_SECONDS=30 pnpm sandbox:loop

# Inspect the sandbox workspace.
pnpm sandbox:shell

# Verify the sandbox and OpenCode TUI startup.
pnpm sandbox:check

# Delete and reseed only the sandbox workspace.
pnpm sandbox:reset
```

Resetting the workspace does not delete the separate OpenCode authentication
volume. No host SSH keys, cloud credentials, home directory, or Docker socket
are exposed to the agent.
