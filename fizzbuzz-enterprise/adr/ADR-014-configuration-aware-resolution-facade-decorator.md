# ADR-014: Configuration-Aware Resolution Facade Decorator Architecture

## Status
Accepted

## Context
The FizzBuzz resolution facade (`IFizzBuzzSingleValueResolutionFacade`) currently delegates computation through a deeply nested decorator chain without any configuration-aware auditing or runtime divisor introspection. As the enterprise divisor configuration becomes externally managed (see ADR-013), the resolution facade must be able to advertise which divisor configuration profile is active, log configuration-aware context during resolution, and provide runtime observability into which divisors are registered.

## Decision
We will introduce a `IConfigurationAwareResolutionFacadeDecorator` that wraps the existing resolution facade chain with configuration-aware behavior:

1. **`IConfigurationAwareResolutionFacadeDecorator`** — Contract interface extending `IFizzBuzzSingleValueResolutionFacade` with methods to access the wrapped facade and the active configuration provider.
2. **`AbstractBaseConfigurationAwareResolutionFacadeDecorator`** — Abstract base implementing common validation and resolution context building, using the Template Method pattern for subclass extension points.
3. **`DefaultConfigurationAwareResolutionFacadeDecoratorImpl`** — Concrete decorator that intercepts `resolveValue` and `resolveRange` calls to log configuration context (active profile, registered divisors, provider name/version) before delegating to the wrapped facade chain.

The decorator is inserted as the outermost layer in the resolution facade chain, inside `resolveResolutionFacade()` in `fizzbuzz.ts`, after the interception filter chain decorator.

## Consequences
### Positive
- Every FizzBuzz value resolution now carries configuration-aware audit context in debug logs.
- The active divisor configuration profile is introspectable at runtime through the decorator's `getConfigurationProvider()` method.
- The decorator follows the established decorator pattern used elsewhere in the codebase (`ValidatingDivisibilityResolutionFacadeDecoratorImpl`, `InterceptionFilterChainResolutionFacadeDecorator`).
- The configuration provider is lazily resolved from the factory and does not introduce a new initialization dependency.

### Negative
- An additional decorator layer adds one more level of indirection to the already deep resolution facade chain.
- Debug log verbosity increases with each configuration-aware resolution, potentially impacting high-throughput scenarios.
- Teams must be aware that the decorator order matters and this decorator must remain as the outermost wrapper.

## Compliance
The decorator SHALL be transparent — it MUST NOT alter the computed FizzBuzz output under any circumstance. Its sole responsibility is configuration-aware logging and observability. The decorator SHALL be instantiated per resolution facade and SHALL NOT maintain shared mutable state across facade instances.

## Related ADRs
- ADR-005: Enterprise Service Bus Architecture
- ADR-012: Enterprise Divisibility Resolution Facade Architecture
- ADR-013: Enterprise Modulo Arithmetic Configuration Provider Architecture
