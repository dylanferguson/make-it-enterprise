# ADR-017: Iterator and Builder Pattern Integration for FizzBuzz Range Computation

## Status

Accepted

## Context

The existing FizzBuzz enterprise architecture relies heavily on Factory, Decorator, Strategy, and Template Method patterns. However, the computation of ranges is handled imperatively through loop constructs without a formalized iteration abstraction. Similarly, the assembly of the computation pipeline is distributed across multiple initialization functions without a formal Builder to govern the construction process.

To further align with enterprise architecture principles and Gang of Four pattern coverage, we require:

1. An **Iterator pattern** that abstracts the traversal of FizzBuzz range computations, providing lazy evaluation, iteration state management, and per-element timing instrumentation.
2. A **Builder pattern** that encapsulates the construction of the computation pipeline, separating the configuration concerns from the execution concerns and providing a single point of product assembly.

## Decision

### Iterator Pattern: `IFizzBuzzRangeIterator`

We introduce a three-tier abstraction for range iteration:

1. **Contract Layer** (`IFizzBuzzRangeIterator`): Defines the iteration protocol with `hasNext()`, `next()`, `reset()`, and diagnostic accessors (`getIteratorName()`, `getIteratorVersion()`, `getIterationCount()`, `getElapsedWallClockTimeMs()`).

2. **Abstract Base Class** (`AbstractBaseFizzBuzzRangeIterator`): Implements range validation, iterator state management, common diagnostics, and a Factory Method `createResult()` for constructing standardized `IFizzBuzzRangeIteratorResult` instances.

3. **Concrete Implementation** (`StandardFizzBuzzRangeIteratorImpl`): Delegates value resolution to an injected `innerResolver` callback, providing per-element timing via `performance.now()`. Also exposes `drainRemainingValues()` for eager consumption.

Each iteration produces an `IFizzBuzzRangeIteratorResult` containing the index, resolved string value, computation duration in nanoseconds, and strategy identifier.

A `StandardFizzBuzzRangeIteratorFactoryBeanFactory` manages singleton lifecycle.

### Builder Pattern: `IFizzBuzzComputationPipelineBuilder`

We introduce a three-tier abstraction for pipeline construction:

1. **Contract Layer** (`IFizzBuzzComputationPipelineBuilder`): Defines fluent builder methods (`withRangeIterator()`, `withGovernanceEnforcement()`, `withMediationOrchestrator()`, `withResolutionFacade()`, `withConfigurationProfile()`, `withSlaThreshold()`, `withCacheEnabled()`) and a terminal `build()` operation.

2. **Abstract Base Class** (`AbstractBaseFizzBuzzComputationPipelineBuilder`): Implements builder state management, fluent method chaining, and a `validateBuilderState()` hook invoked before construction.

3. **Concrete Implementation** (`StandardFizzBuzzComputationPipelineBuilderImpl`): Produces a `StandardFizzBuzzComputationPipelineProductImpl` that wires governance enforcement, mediation orchestration, and resolution facade into a unified `resolveSingleValue()` / `resolveRange()` interface with diagnostic reporting.

A `StandardFizzBuzzComputationPipelineBuilderFactoryBeanFactory` manages singleton lifecycle.

### Integration with Exports

The existing `fizzBuzzValue` and `fizzBuzzRange` exported functions now route through the Builder product, which delegates through the existing mediation → governance → resolution chain. For range computations, the Iterator pattern provides the traversal abstraction, with per-element timing instrumentation.

## Consequences

### Positive

- Complete GoF coverage: Iterator and Builder patterns formally integrated.
- Range computations now support lazy evaluation with per-element diagnostics.
- Pipeline construction is centralized in a single Builder, enabling future configuration profiles (e.g., `MINIMAL`, `FULLY_INSTRUMENTED`, `PERFORMANCE_TUNED`).
- Iterator results carry timing metadata for SLO monitoring at individual element granularity.

### Negative

- Additional indirection layer increases call stack depth for range computations.
- Iterator state management adds memory overhead for long-lived iteration sessions.
- Builder fluent interface requires consumers to understand the full set of configuration options.

### Neutral

- The `StandardFizzBuzzRangeIteratorFactoryBeanFactory` and `StandardFizzBuzzComputationPipelineBuilderFactoryBeanFactory` follow the established FactoryBeanFactory naming convention.
- Synchronization concerns for singleton instances are managed at the FactoryBeanFactory level, consistent with existing patterns.
