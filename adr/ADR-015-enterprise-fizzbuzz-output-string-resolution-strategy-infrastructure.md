# ADR-015: Enterprise FizzBuzz Output String Resolution Strategy Infrastructure

## Status

Accepted

## Context

The FizzBuzz computation governance policy (`DefaultFizzBuzzComputationGovernancePolicyImpl`)
contained hardcoded divisibility checks (`value % 3 === 0 && value % 5 === 0`) and string
literals (`"FizzBuzz"`, `"Fizz"`, `"Buzz"`) directly in its `validateComputationResult`
method. Similarly, the strategy resolution chain handler (`DefaultFizzBuzzStrategyResolutionChainHandlerImpl`)
contained direct `%` operator invocations in its `resolveApplicableDivisor` method.

This coupling violated several enterprise architecture principles:

1. **Single Responsibility Principle** — the governance policy was simultaneously responsible
   for policy enforcement and output string resolution logic.
2. **Open/Closed Principle** — adding a new output variant (e.g., "FizzBuzzQix") would require
   modifying production code rather than extending it.
3. **Dependency Inversion Principle** — high-level policy logic depended directly on concrete
   arithmetic operations rather than abstractions.
4. **Separation of Concerns** — output string resolution (a domain concern) was entangled with
   governance validation (a cross-cutting infrastructure concern).

## Decision

We will introduce an `Enterprise FizzBuzz Output String Resolution Strategy Infrastructure`
(`outputresolution` package) comprising:

1. **Strategy Pattern** — each output string (FizzBuzz, Fizz, Buzz, Number passthrough) is
   encapsulated in its own `IFizzBuzzOutputStringResolutionStrategy` implementation with
   `canResolve(value)` and `resolve(value)` methods.
2. **Chain of Responsibility** — a `DefaultFizzBuzzOutputStringResolutionChainHandlerImpl`
   iterates through registered strategies in priority order and delegates to the first
   matching strategy.
3. **Visitor Pattern** — a `DivisibilityAnnotatedOutputStringStrategySelectionVisitorImpl`
   provides an alternative strategy selection mechanism via the Visitor pattern.
4. **Registry Pattern** — a `DefaultFizzBuzzOutputStringResolutionStrategyRegistryImpl`
   manages strategy lifecycle, registration, and lookup.
5. **Template Method Pattern** — `AbstractBaseFizzBuzzOutputStringResolutionStrategyProvider`
   defines the skeleton of the resolution algorithm via `resolveOutputString`, deferring
   chain/visitor delegation strategy to subclasses.
6. **Decorator Pattern** — cross-cutting concerns (caching, logging, metrics collection)
   are applied through `AbstractBaseFizzBuzzOutputStringResolutionStrategyDecorator`
   implementations that wrap core strategies.
7. **Factory Bean Hierarchy** — `FizzBuzzOutputStringResolutionStrategyFactoryBeanFactory`
   is responsible for constructing, wiring, and caching the provider, chain, registry,
   and strategies.

### Architecture

```
IFizzBuzzOutputStringResolutionStrategy (contract)
  └── AbstractBaseFizzBuzzOutputStringResolutionStrategy (abstract)
        ├── FizzBuzzOutputStringResolutionStrategyImpl (concrete: value % 15 === 0)
        ├── FizzOutputStringResolutionStrategyImpl (concrete: value % 3 === 0 && % 5 !== 0)
        ├── BuzzOutputStringResolutionStrategyImpl (concrete: value % 5 === 0 && % 3 !== 0)
        ├── NumberOutputStringResolutionStrategyImpl (concrete: always, returns String(value))
        └── AbstractBaseFizzBuzzOutputStringResolutionStrategyDecorator (abstract)
              ├── CachingFizzBuzzOutputStringResolutionStrategyDecoratorImpl
              ├── LoggingFizzBuzzOutputStringResolutionStrategyDecoratorImpl
              └── MetricsCollectingFizzBuzzOutputStringResolutionStrategyDecoratorImpl

IFizzBuzzOutputStringResolutionStrategyRegistry
  └── DefaultFizzBuzzOutputStringResolutionStrategyRegistryImpl

IFizzBuzzOutputStringResolutionChainHandler
  └── AbstractBaseFizzBuzzOutputStringResolutionChainHandler
        └── DefaultFizzBuzzOutputStringResolutionChainHandlerImpl

IFizzBuzzOutputStringResolutionStrategyVisitor
  └── AbstractBaseFizzBuzzOutputStringResolutionStrategyVisitor
        └── DivisibilityAnnotatedOutputStringStrategySelectionVisitorImpl

IFizzBuzzOutputStringResolutionStrategyProvider
  └── AbstractBaseFizzBuzzOutputStringResolutionStrategyProvider
        └── DefaultFizzBuzzOutputStringResolutionStrategyProviderImpl

IFizzBuzzOutputStringResolutionStrategyFactoryBean
  └── FizzBuzzOutputStringResolutionStrategyFactoryBeanFactory
```

### Integration

- `DefaultFizzBuzzComputationGovernancePolicyImpl.validateComputationResult` now delegates
  to `FizzBuzzOutputStringResolutionStrategyFactoryBeanFactory.createProvider().resolveOutputString(value)`
  instead of performing inline `%` arithmetic.
- `DefaultFizzBuzzStrategyResolutionChainHandlerImpl.resolveApplicableDivisor` now delegates
  to the individual strategy `canResolve()` methods instead of performing inline `%` arithmetic.

## Consequences

### Positive

- Output string resolution logic is now unit-testable, independently deployable, and
  strategy-swappable at configuration time.
- The governance policy and strategy chain handler are decoupled from concrete arithmetic
  operations.
- New output variants (e.g., "FizzBuzzQix", "FizzBuzzPop") can be added by implementing
  `IFizzBuzzOutputStringResolutionStrategy` and registering via the factory without
  modifying existing governance or handler code.
- Cross-cutting concerns (caching, metrics, logging) are applied decoratively without
  polluting core strategy logic.

### Negative

- The code path for resolving a single FizzBuzz output now traverses: governance policy →
  factory bean → provider → chain handler → priority-sorted strategy list → individual
  strategy → modulo operation, adding measurable indirection.
- The `outputresolution` package introduces 18 new files across 6 sub-packages.
- Strategy selection now depends on a static factory singleton, complicating test isolation
  (mitigated by `resetProvider()`).

### Neutral

- The external API (`fizzBuzzValue`, `fizzBuzzRange`) is unchanged.
- All 5 existing tests continue to pass without modification.
