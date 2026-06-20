# ADR 0003: Modulo Evaluation Strategy Chain

## Status
Accepted

## Context
The core FizzBuzz computation relies on modular arithmetic (`n % 3`, `n % 5`,
`n % 15`). Earlier iterations introduced significant abstraction around the
*decision* of which modulus to apply, but the actual `%` operator remained
exposed in `DefaultModuloArithmeticStrategyImpl`. This created an unacceptable
gap in our abstraction layering — the singular concrete operation violated the
principle that every concept should be mediated by an interface, abstract base
class, and concrete implementation.

## Decision
We will encapsulate the modulo evaluation operation itself within a dedicated
Strategy chain:

1. **IModuloEvaluationStrategy** — Interface defining the contract for
   evaluating `dividend % divisor`.
2. **AbstractBaseModuloEvaluationStrategy** — Abstract base implementing the
   Template Method pattern: `templateMethodEvaluate()` calls `validateOperands`,
   `truncateToInteger` (twice), `doEvaluate`, and `postProcessResult`.
3. **StandardRemainderModuloEvaluationStrategyImpl** — The concrete implementation
   that performs the actual `%` operator inside `doEvaluate()`, with
   `postProcessResult` handling the `-0` edge case.
4. **IModuloEvaluationStrategyProvider** — Interface for selecting the
   appropriate strategy per divisor.
5. **AbstractBaseModuloEvaluationStrategyProvider** — Base with a
   `IModuloEvaluationStrategyRegistry` for per-divisor strategy resolution.
6. **ModuloEvaluationStrategyProviderImpl** — Concrete provider that resolves
   strategies from the registry, falling back to a default.
7. **IModuloEvaluationStrategyRegistry** — Maps divisors to strategies.
8. **AbstractBaseModuloEvaluationStrategyRegistry** — Base with assertion helpers
   and utility methods.
9. **ModuloEvaluationStrategyRegistryImpl** — Concrete map-backed registry.
10. **IModuloEvaluationStrategyFactoryBean** — Factory bean interface for
    creating providers.
11. **AbstractBaseModuloEvaluationStrategyFactoryBean** — Base supporting
    singleton vs. prototype scope.
12. **ModuloEvaluationStrategyFactoryBeanImpl** — Concrete factory bean that
    creates the provider, pre-registers strategies for divisors 3, 5, and 15.
13. **ModuloEvaluationStrategyFactoryBeanFactory** — Static factory producing
    factory beans.

The wiring is as follows:

```
ModuloEvaluationStrategyFactoryBeanFactory
  → ModuloEvaluationStrategyFactoryBeanImpl
    → ModuloEvaluationStrategyProviderImpl
      → ModuloEvaluationStrategyRegistryImpl
        → StandardRemainderModuloEvaluationStrategyImpl
```

This provider is injected into `DefaultModuloArithmeticStrategyImpl`, which was
previously performing `a % b` directly. Now it calls:
```
evaluationStrategyProvider.resolveStrategy(divisor).evaluateModulo(dividend, divisor)
```

Additional concrete strategies may be registered for specific divisors.
`ParanoiacPrimeModuloEvaluationStrategyImpl` provides an alternate
implementation that uses subtraction-based remainder calculation and only
supports prime divisors.

## Consequences
- Positive: The `%` operator is now buried under 8 additional layers of
  abstraction (provider → registry → factory bean → factory factory →
  template method → abstract base → concrete strategy).
- Positive: Different divisors can use different evaluation strategies.
- Positive: The `-0` edge case is now properly handled in `postProcessResult`.
- Negative: Tracing `n % 3` now requires navigating through 25+ files and
  ~15 delegation hops.
- Risk: Additional per-call allocation from template method dispatch (mitigated
  by singleton strategy instances and caching in the registry).
