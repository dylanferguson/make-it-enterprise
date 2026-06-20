# ADR-010: Computation Request Interception Filter Chain Architecture

## Status
Accepted

## Context
The FizzBuzz computation resolution path had grown increasingly layered — from
the bootstrap gate through the resolution facade factory, the validation-aware
decorator, the strategy selection facade, the command decorator chain, the
expression evaluator, the divisibility specification, the supervisor, the
delegation bridge, the evaluation strategy chain, the modulo chain handlers,
and finally to the native modulo operator. However, the computation request
itself entered this path without any formalized preprocessing pipeline.

Cross-cutting concerns such as request auditing, latency metrics collection,
parameter validation, and thread-local context propagation were scattered
across the codebase or handled implicitly within individual components.

## Decision
We will introduce a **Computation Request Interception Filter Chain** that
wraps the existing resolution facade hierarchy. This architecture follows the
Servlet Filter pattern from the J2EE specification era.

### Architecture

Each computation request passes through an ordered chain of
`IComputationRequestInterceptionFilter` implementations before reaching the
terminating resolution facade, and responses propagate back through the same
chain.

### Filter Registry

The following filters are registered in the standard configuration profile:

| Filter                    | Priority | Responsibility                          |
|---------------------------|----------|-----------------------------------------|
| RequestValidationFilter   | 400      | Validates request bounds, rejects out-of-range values |
| RequestMetricsFilter      | 200      | Collects per-request latency metrics    |
| RequestAuditingFilter     | 300      | Logs request/response pairs for audit trail |
| ThreadLocalContextFilter  | 500      | Propagates correlation context           |

Filters are sorted by descending priority. A filter may short-circuit the
chain by throwing an exception (e.g., validation failure).

### Configuration Profiles

The filter chain supports multiple configuration profiles:
- `STANDARD` — validation, metrics, auditing
- `OBSERVABILITY_HEAVY` — all filters including thread-local context
- `MINIMAL` — validation only
- `STRICT_VALIDATION` — validation and thread-local context

The decorator that activates the filter chain has its own profiles:
- `ENABLED_STANDARD` — filter chain active with STANDARD profile
- `ENABLED_OBSERVABILITY_HEAVY` — filter chain active with OBSERVABILITY_HEAVY
- `DISABLED` — filter chain bypassed entirely (pass-through to inner facade)

## Consequences
- Every `resolveValue` and `resolveRange` call now incurs the overhead of
  filter chain traversal before the actual computation begins.
- Auditing, metrics, and validation are centralized in the filter layer
  rather than scattered across individual components.
- New cross-cutting concerns can be added as additional filters without
  modifying existing resolution logic.
- The computation path is now one layer deeper, making the eventual modulo
  operation even harder to locate from the entry point.
