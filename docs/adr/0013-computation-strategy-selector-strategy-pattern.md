# ADR-013: Computation Strategy Selector Strategy Pattern

## Status
Accepted

## Context
The FizzBuzz enterprise architecture employs a Chain of Responsibility for
strategy selection through `IEnterpriseComputationStrategySelectionHandler`.
However, the selection of *which* handler to invoke has itself been hard-coded.
This violates the enterprise principle that every decision point should be
mediated through a strategy.

## Decision
Introduce a `IComputationStrategySelectorStrategy` — a strategy for selecting
the strategy selector. This follows the Strategy pattern applied recursively:

1. **IComputationStrategySelectorStrategy** — interface for strategies that
   select which `IEnterpriseComputationStrategySelectionHandler` to delegate to
2. **AbstractBaseEnterpriseComputationStrategySelectorStrategy** — abstract base
   with validation and framework versioning
3. **StandardEnterpriseComputationStrategySelectorStrategyImpl** — default
   implementation that resolves the handler via the
   `EnterpriseComputationStrategySelectorStrategyFactoryBeanFactoryRegistry`
4. **StandardEnterpriseComputationStrategySelectorStrategyFactoryBean** —
   factory bean producing selector strategy instances
5. **StandardEnterpriseComputationStrategySelectorStrategyFactoryBeanFactory** —
   factory bean factory with priority-based registration

The `StrategySelectorAwareFizzBuzzComputationCommandDecoratorImpl` decorates the
existing command chain, intercepting each computation request to invoke the
selector strategy before delegating to the wrapped command.

## Consequences
- The selection of strategy selectors is now itself a pluggable strategy
- Additional selector strategies can be registered in the registry with
  configurable priority
- The FizzBuzz computation is one more layer removed from direct execution
- Increased diagnostic traceability through `Command=FlyweightManagedFizzBuzzComputationCommand`
  audit entries (visible in runtime logs)
