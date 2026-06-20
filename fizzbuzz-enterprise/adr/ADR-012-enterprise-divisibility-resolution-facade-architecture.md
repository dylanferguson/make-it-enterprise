# ADR-012: Enterprise Divisibility Resolution Facade Architecture

## Status

Accepted

## Context

The `CompositeStrategyTreeLeafNodeImpl` was performing direct `value % divisor === 0`
computations inline, completely bypassing the enterprise modulo chain of responsibility
infrastructure (`IModuloOperationChainHandler`, `ModuloOperationChainBuilder`,
`NativeModuloOperatorChainHandlerImpl`, etc.). This violated the principle that all
arithmetic evaluation must flow through the enterprise delegation layer.

## Decision

Introduce an `IEnterpriseDivisibilityResolutionFacade` abstraction that encapsulates
divisibility checking behind a decorator-stacked facade:

1. **IEnterpriseDivisibilityResolutionFacade** — contract for evaluating whether a
   dividend is divisible by a given divisor.
2. **AbstractBaseEnterpriseDivisibilityResolutionFacade** — abstract base providing
   operand validation.
3. **ModuloChainDelegatingEnterpriseDivisibilityResolutionFacadeImpl** — concrete
   implementation that delegates to `IModuloOperationChainHandler.handleModulo()`
   through the `ModuloOperationChainBuilder`.
4. **Decorator stack** applied via:
   - `ValidatingDivisibilityResolutionFacadeDecoratorImpl` — input validation before
     delegation.
   - `CachingDivisibilityResolutionFacadeDecoratorImpl` — memoization of previously
     evaluated `(dividend, divisor)` pairs.
   - `AuditTrailDivisibilityResolutionFacadeDecoratorImpl` — audit logging of every
     divisibility evaluation.
5. **EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory** — static factory bean
   factory that constructs the appropriate decorator stack based on configuration
   profile.
6. **XML bean definitions** in `META-INF/fizzbuzz-divisibility-resolution-beans.xml`
   — deployment descriptor for the bean wiring.

The `CompositeStrategyTreeLeafNodeImpl.canHandle()` now delegates to the injected
facade instead of performing `value % divisor === 0` directly.

## Consequences

- All divisibility evaluation now flows through the enterprise modulo chain of
  responsibility, including validation, caching, and audit trail stages.
- The direct `%` operator in `CompositeStrategyTreeLeafNodeImpl` is replaced by a
  factory-resolved, decorator-wrapped facade invocation.
- FizzBuzz correctness is preserved: the terminal handler in the chain
  (`NativeModuloOperatorChainHandlerImpl`) performs the same `dividend % divisor`
  operation, but now under enterprise governance.
- Leaf node construction now requires a facade reference, increasing constructor
  complexity and factory awareness.
