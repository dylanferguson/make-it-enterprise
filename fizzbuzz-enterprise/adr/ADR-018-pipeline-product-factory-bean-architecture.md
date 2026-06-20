# ADR-018: FizzBuzz Computation Pipeline Product Factory Bean Architecture

## Status

Accepted

## Context

The `StandardFizzBuzzComputationPipelineProductImpl` class was previously defined
as a private inner class within `StandardFizzBuzzComputationPipelineBuilderImpl`,
violating the enterprise principle that every concept must be expressed through at
least one interface, one abstract base class, and one concrete implementation.
Additionally, the pipeline product had no decorator chain for pre- and post-
resolution processing, and its configuration profile was resolved via ad-hoc
literal values rather than through a centralized configuration provider.

## Decision

We have extracted the pipeline product into a full enterprise artifact hierarchy:

1. **IFizzBuzzComputationPipelineProduct** — The contract (previously defined inline
   in the builder contracts file, now fully realized as a standalone contract).

2. **AbstractBaseFizzBuzzComputationPipelineProduct** — Provides the common
   constructor, diagnostic summary, and method dispatch skeleton.

3. **StandardFizzBuzzComputationPipelineProductImpl** — The concrete product,
   implementing the actual resolution mediation governance chain.

4. **IFizzBuzzComputationPipelineProductFactoryBean** — Factory bean interface
   for creating and destroying pipeline products.

5. **AbstractBaseFizzBuzzComputationPipelineProductFactoryBean** — Shared
   singleton management and lifecycle hooks.

6. **StandardFizzBuzzComputationPipelineProductFactoryBeanImpl** — Concrete
   factory bean that instantiates `StandardFizzBuzzComputationPipelineProductImpl`.

7. **FizzBuzzComputationPipelineProductFactoryBeanFactory** — Static factory bean
   factory that vends factory beans.

A parallel hierarchy was introduced for configuration management:

8. **IFizzBuzzPipelineProductConfigurationProfile** / **IFizzBuzzPipelineProductConfigurationProvider** —
   Contracts for profile-aware configuration resolution.

9. **AbstractBaseFizzBuzzPipelineProductConfigurationProvider** — Abstract base
   with profile registration and active-profile management.

10. **DefaultFizzBuzzPipelineProductConfigurationProviderImpl** — Registers
    four canonical profiles (ENTERPRISE_ITERATOR_BASED, STANDARD, STRICT,
    OBSERVABILITY) with distinct SLA thresholds, caching toggles, and decorator
    chain profiles.

11. **FizzBuzzPipelineProductConfigurationProviderFactoryBeanFactory** — Static
    factory that creates the configuration provider and applies the decorator
    chain to pipeline products.

A Decorator pattern chain completes the architecture:

12. **IFizzBuzzComputationPipelineProductDecorator** — Contract for decorating
    a pipeline product.

13. **AbstractBaseFizzBuzzComputationPipelineProductDecorator** — Abstract base
    for decorators.

14. **CachingPipelineProductDecoratorImpl** — Decorator that caches
    `resolveSingleValue` results with hit/miss ratio tracking.

15. **SlaThresholdValidatingPipelineProductDecoratorImpl** — Decorator that
    measures resolution latency and warns when SLA thresholds are exceeded.

## Consequences

- The external FizzBuzz behavior is unchanged. The same chain of
  mediation → governance → facade → strategy resolution → modulo operation is
  preserved.
- Pipeline products are now configurable via named profiles that control SLA
  thresholds, caching behavior, and decorator chain selection.
- Decorators can be stacked in arbitrary order via the
  `applyDecoratorChain` method without modifying the product or builder.
- SNARC (Single Naming And Responsibility Convention) is maintained: every
  component has a name, a version, and a diagnostic summary.
- Initialization order is preserved: the configuration provider is created
  lazily when `resolveBuilderPipelineProduct()` is first called.
