# ADR-032: Pipeline Manager Resolution Strategy Selector Pattern

## Status
Accepted

## Context
The FizzBuzz computation pipeline requires a `IFizzBuzzPipelineManager` to
orchestrate single-value and range-based resolution. Previously, the manager
was resolved directly via `resolvePipelineManager()` without any abstraction
layer governing _how_ the manager is obtained.

As the enterprise architecture matures, the resolution strategy itself must
become a configurable, extensible concern. Different deployment profiles may
require different resolution strategies:
- Direct instantiation (standard standalone deployment)
- Service Locator lookup (managed container environment)
- High-availability with fallback (multi-node cluster)

## Decision
Introduce a **Pipeline Manager Resolution Strategy Selector** pattern that
decouples manager resolution from consumption.

### Architecture

```
fizzBuzzValue(n)
  → IPipelineManagerResolutionStrategySelector
    → selectPipelineManagerResolutionStrategy()
      → IPipelineManagerResolutionStrategy
        → resolvePipelineManager()
          → IFizzBuzzPipelineManager
            → executeSingleValuePipeline(n)
```

### Components

1. **IPipelineManagerResolutionStrategy** — contract for strategies that
   resolve an `IFizzBuzzPipelineManager`.

2. **IPipelineManagerResolutionStrategySelector** — contract for selectors
   that pick an appropriate strategy based on an active configuration profile.

3. **IPipelineManagerResolutionConfigurationProfile** — contract for profiles
   that dictate strategy selection parameters (timeout, retry, service locator
   awareness).

4. **AbstractBase classes** — Template Method pattern applied to each contract
   to enforce consistent logging, validation, and lifecycle hooks across all
   implementations.

5. **DirectPipelineManagerResolutionStrategyImpl** — resolves the manager by
   directly invoking the existing `resolvePipelineManager()` function
   (backward-compatible default).

6. **ServiceLocatorManagedPipelineManagerResolutionStrategyImpl** — resolves
   the manager through the `IServiceLocator`, enabling container-managed
   lifecycle and JNDI-style lookup.

7. **ConfigurationProfileDrivenPipelineManagerResolutionStrategySelectorImpl**
   — selects a strategy based on the active `PipelineManagerResolutionStrategyConfigurationProfileName`
   with configurable fallback chain.

### Factory Infrastructure

- `PipelineManagerResolutionStrategyFactoryBeanFactory`
- `PipelineManagerResolutionStrategySelectorFactoryBeanFactory`
- `PipelineManagerResolutionConfigurationProfileFactoryBeanFactory`
- `PipelineManagerResolutionStrategyInfrastructureProviderFactoryBeanFactory`

An **InfrastructureProvider** factory bean factory orchestrates the
initialization of all sub-components, maintains singleton lifecycle, and
provides a single entry point for bootstrap integration.

## Consequences

- **Positive**: The resolution strategy is now a configurable, extensible
  concern. New strategies (e.g., cached, circuit-breaker-aware, JNDI-backed)
  can be added without modifying the pipeline entry point.
- **Negative**: Adds 18 new source files and one additional indirection layer
  to what was previously a direct function call.
- **Neutral**: Backward compatible — the default configuration profile
  ("STANDARD") selects the `DirectPipelineManagerResolutionStrategyImpl`,
  which delegates to the original `resolvePipelineManager()`.
