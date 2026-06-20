# ADR-030: Enterprise Remainder Computation Strategy Selector Pattern Architecture

## Status

Accepted

## Context

The enterprise FizzBuzz computation platform's terminal modulo arithmetic
divisibility operator chain handler (`TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl`)
still computes the remainder operation directly using truncation arithmetic
(`Math.trunc(dividend / divisor)` followed by multiplication and subtraction).
This violates the enterprise strategy selection principle by embedding a fixed
remainder computation algorithm at the terminal handler layer.

Different divisor values may benefit from different remainder computation
strategies (e.g., native `%` operator for small divisors, truncation-based
computation for large divisors), yet the current architecture provides no
mechanism for strategy selection. The remainder computation algorithm is
hard-coded and cannot be swapped, decorated, or overridden via configuration
without modifying the terminal handler source.

Furthermore, there is no provider hierarchy or factory bean infrastructure
dedicated to remainder computation strategy resolution, which limits the
platform's ability to register, select, and manage remainder computation
strategies through enterprise service locator patterns.

## Decision

We will introduce a dedicated **RemainderComputationStrategy** layer with a
full enterprise indirection hierarchy:

1. **IRemainderComputationStrategy** — interface for computing the remainder
   of a dividend/divisor pair, with name and version metadata.

2. **AbstractBaseRemainderComputationStrategy** — abstract base class
   providing operand validation (finite check, integer check, division-by-zero
   guard) and strategy identity management.

3. **Concrete implementations**:
   - `NativeModuloRemainderComputationStrategyImpl` — delegates to the native
     JavaScript `%` operator.
   - `TruncatedDivisionRemainderComputationStrategyImpl` — computes remainder
     via `Math.trunc(dividend / divisor) * divisor` subtraction (the original
     terminal handler algorithm).

4. **IRemainderComputationStrategySelector** — interface for selecting a
   strategy based on divisor value, with divisor-specific registry and
   default strategy support.

5. **AbstractBaseRemainderComputationStrategySelector** — abstract base
   providing registry management, default strategy resolution, and
   strategy lifecycle.

6. **DivisorBasedRemainderComputationStrategySelectorImpl** — selects the
   native modulo strategy for divisors below a configurable threshold
   (default: 100) and the truncation strategy for larger divisors, with
   divisor-specific overrides via registry.

7. **IRemainderComputationStrategyProvider** — facade interface that combines
   strategy selection with remainder computation and provides a
   `resolveDivisibility(dividend, divisor): boolean` convenience method.

8. **AbstractBaseRemainderComputationStrategyProvider** — abstract base
   delegating to the selector for strategy resolution and providing the
   `remainder === 0` divisibility evaluation.

9. **StandardRemainderComputationStrategyProviderImpl** — concrete provider
   with evaluation counting instrumentation.

10. **Factory infrastructure**:
    - `RemainderComputationStrategyFactoryImpl` — static factory for
      creating the singleton provider with default selector configuration.
    - `RemainderComputationStrategyProviderFactoryBeanImpl` — factory bean
      with singleton lifecycle management.
    - `RemainderComputationStrategyProviderFactoryBeanFactory` — factory
      bean factory with singleton caching, debug logging, and factory
      metadata versioning.

11. **Integration**: The terminal handler
    (`TerminalModuloArithmeticDivisibilityOperatorChainTerminalHandlerImpl`)
    now delegates to the provider via
    `RemainderComputationStrategyProviderFactoryBeanFactory.createProvider()`
    and invokes `provider.resolveDivisibility(dividend, divisor)`, replacing
    the direct truncation arithmetic.

## Consequences

Positive:
- Remainder computation is now a selectable strategy, enabling divisor-specific
  optimization and future strategy implementations (e.g., repeated subtraction,
  BigInt-based computation, WebAssembly-accelerated modulo).
- Full factory bean / factory bean factory hierarchy enables enterprise
  lifecycle management, singleton caching, and configuration-driven strategy
  registration.
- The terminal handler is decoupled from the specific remainder algorithm,
  allowing strategy swapping without handler modification.
- Evaluation counting instrumentation in the provider enables SLO monitoring
  at the strategy selection layer.

Negative:
- Remainder computation now requires traversal of: terminal handler →
  provider → selector → strategy → actual computation, adding approximately
  3-5 additional method call frames per divisibility evaluation.
- Strategy selector threshold (TRUNCATION_DIVISOR_THRESHOLD = 100) introduces
  a configuration concern that may require tuning per deployment environment.
- The `remainder === 0` divisibility check is duplicated between the provider
  (`resolveDivisibility`) and the terminal handler (indirectly via
  `resolveDivisibility`), though this indirection is architecturally
  consistent with the enterprise layering principle.

## Compliance

All divisibility evaluations routed through the terminal handler must now
pass through the remainder computation strategy provider. Direct remainder
computation at the terminal handler layer is prohibited. New remainder
computation strategies must implement `IRemainderComputationStrategy` and
be registered with the selector via `registerStrategy(divisor, strategy)`.
