# ADR-026: Enterprise FizzBuzz Modular Arithmetic Execution Coordinator Circuit Breaker Architecture

## Status

Accepted

## Context

The FizzBuzz computation pipeline has grown to span 80+ enterprise integration
points (EJB entity beans, MDB containers, JMS channels, ESB routers, SLA
monitors, validation gates, governance enforcement facades, mediation
orchestrators, protocol stacks, specification engines, expression interpreters,
AOP weavers, batch processors, and service locator proxies). Despite this
richness, the modular arithmetic execution path lacked:

1. Circuit breaker protection against repeated modulo evaluation failures
2. Explicit strategy-driven execution selection
3. Coordinated lifecycle phase management per computation
4. SLA-aware per-execution metrics collection

A new enterprise-grade execution coordination layer is required to address these
architectural deficiencies.

## Decision

We will introduce a `ModularArithmeticExecutionCoordinator` architecture
consisting of:

### Core Components

1. **`IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator`** — The
   top-level execution coordination contract. Provides single-value coordination
   (`coordinateSingleValueExecution`), strategy registration introspection, and
   circuit breaker state snapshots.

2. **`IModularArithmeticExecutionStrategy`** — A per-divisor execution strategy
   contract. Each strategy encapsulates the divisibility evaluation and output
   resolution for a specific divisor (3, 5, 15). Strategies use the existing
   `EnterpriseDivisibilityExpressionInterpreter` infrastructure for evaluation.

3. **`IModularArithmeticExecutionStrategySelector`** — A strategy selection
   contract (Strategy pattern). The `DivisorBasedModularArithmeticExecutionStrategySelectorImpl`
   selects the appropriate strategy using early-return multiplier matching
   (divisible-by-15, divisible-by-5, divisible-by-3, fallback).

### Circuit Breaker Pattern (Decorator)

4. **`ICircuitBreakerState` / `ICircuitBreakerStateStore`** — State machine
   with `CLOSED`, `OPEN`, and `HALF_OPEN` states (per Nygard, *Release It!*,
   2007). The `InMemoryCircuitBreakerStateStoreImpl` tracks failure/success
   counts and last-failure timestamps for timeout-based half-open transitions.

5. **`CircuitBreakerManagedExecutionCoordinatorDecoratorImpl`** — Wraps the
   coordinator with circuit breaker logic: opens after configurable failure
   threshold, rejects executions while open, transitions to half-open after
   timeout, and resets to closed after success threshold.

### Lifecycle State Machine (Decorator)

6. **`IExecutionLifecycleContext`** — A state machine (per Gamma et al.)
   tracking phases: `INITIALIZED -> STRATEGY_SELECTION ->
   CIRCUIT_BREAKER_EVALUATION -> EXECUTION_RESOLVING -> SLA_VALIDATION ->
   COMPLETED | FAILED`. Each transition is validated against the allowed phase
   set.

### SLA Metrics Collection (Decorator)

7. **`IExecutionSlaMetricsCollector`** — Records per-execution duration,
   timeouts, failures, and successes. Exposes average duration, SLO threshold
   breach detection, and reset capability.

### Decorator Stack Construction

The decorators are composed by the
`ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory`:

```
BaseCoordinator
  → SlaMonitoringDecorator
    → LifecycleDecorator
      → CircuitBreakerDecorator
        → ExecutionCoordinatorAwareResolutionFacadeDecorator
          → ResolutionFacade (existing)
```

### Factory Bean Hierarchy

| Factory Bean | Creates | Singleton |
|---|---|---|
| `EnterpriseExecutionCoordinatorFactoryBeanFactory` | Base coordinator + strategy selector | Yes |
| `CircuitBreakerCoordinatorDecoratorFactoryBeanFactory` | Circuit breaker decorator + state store + config | Partial |
| `SlaMonitoringCoordinatorDecoratorFactoryBeanFactory` | SLA decorator + metrics collector | Partial |
| `LifecycleCoordinatorDecoratorFactoryBeanFactory` | Lifecycle decorator + context | Partial |
| `ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory` | Facade decorator wrapping all of the above | Yes |

## Consequences

- The FizzBuzz modulo computation is now buried under two additional decorator
  layers (circuit breaker + lifecycle + SLA) and a strategy selection layer, for
  a total of approximately 55 additional source files and 5 new factory bean
  classes.
- All `fizzBuzzValue()` invocations now pass through circuit breaker state
  inspection, lifecycle phase transitions, and SLA metrics recording before
  reaching any divisibility evaluation.
- The expression engine (`value % divisor`) remains the terminal evaluation
  mechanism, now three abstraction levels deeper than the public API.
- Circuit breaker state is in-memory only; a future ADR should consider JMS
  Topic-based distributed circuit breaker state replication for cluster-aware
  resilience.
