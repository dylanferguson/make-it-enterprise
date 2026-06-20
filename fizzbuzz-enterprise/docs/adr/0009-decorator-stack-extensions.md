# ADR-009: Composite Value Resolver Decorator Stack Extensions

## Status
Accepted

## Context
The existing value resolver decorator stack applies Retry, Fallback, Caching,
Logging, Validation, Metrics, and Policy Enforcement decorators. Enterprise
deployments require additional cross-cutting concerns: thread-local context
propagation for diagnostic correlation and SLO threshold alerting for budget
depletion detection.

## Decision
Introduce two new decorators implementing ICompositeValueResolver:

1. **ThreadLocalContextPropagatingValueResolverDecorator** — maintains a
   thread-local evaluation depth counter and context correlation map. Propagates
   the current evaluation depth and correlation token through the resolver chain,
   enabling downstream components to access contextual metadata.

2. **SloThresholdAlertingValueResolverDecorator** — wraps the existing SLO metrics
   collector with configurable latency thresholds. Tracks total operations and SLO
   violations, emitting structured warnings when compliance drops below the budget
   consumption threshold (default: 80% of error budget consumed).

These decorators are added to the enterprise resolver chain between the interceptor
chain and the session managed resolver proxy, ensuring all downstream layers
benefit from context propagation and SLO monitoring.

## Consequences
- Positive: Thread-local context propagation enables diagnostic correlation across
  the resolver chain without explicit parameter threading.
- Positive: SLO budget depletion detection provides early warning before error budget
  exhaustion.
- Negative: Thread-local context simulation adds Map overhead per resolution.
- Risk: Thread-local context depth tracking may interact with recursive evaluation
  paths (mitigated by try/finally cleanup).
