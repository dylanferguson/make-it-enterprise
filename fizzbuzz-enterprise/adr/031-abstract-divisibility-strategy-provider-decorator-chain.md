# ADR-031: Abstract Divisibility Strategy Provider Decorator Chain Architecture

## Status
Accepted

## Context
The existing divisibility resolution infrastructure relies on direct modulo
operator evaluation through layered decorator chains. While the decorator chain
provides cross-cutting concern separation (validation, monitoring, governance,
transaction propagation, etc.), the core divisibility evaluation strategy
selection remains tightly coupled to concrete divisor lookups.

Early-2000s Java enterprise patterns teach us that any lookup of an evaluation
strategy by divisor should pass through multiple layers of indirection:
- An abstract strategy provider interface
- A concrete strategy provider implementation backed by a registry
- Factory beans that produce chain-of-responsibility handlers per divisor
- A chain-of-responsibility that pre-evaluates divisibility before delegating
- Strategy evaluators that eventually perform the actual modulo operation

## Decision
We will introduce an `AbstractDivisibilityStrategyProvider` architectural layer
that interposes itself between the outer decorator chain and the inner
resolution facade. The architecture follows a strict interface-abstract-
concrete hierarchy:

### Layer 1: Contracts (`I*`)
- `IAbstractDivisibilityStrategyProvider` — top-level provider contract
- `IModuloEvaluationStrategyFactoryBean` — factory bean for creating handlers
- `IDivisibilityStrategyChainOfResponsibilityHandler` — chain-of-responsibility
  handler per divisor
- `IDivisibilityStrategyEvaluator` — the evaluator that performs `n % d`
- `IAbstractDivisibilityStrategyAwareResolutionFacadeDecorator` — the outer
  decorator that wraps the resolution facade

### Layer 2: Abstract Base Classes (`AbstractBase*`)
Each interface has a corresponding abstract base class that provides default
getter implementations and structural validation.

### Layer 3: Implementations (`*Impl`)
- `AbstractDivisibilityStrategyProviderImpl` — backed by a `Map<number, IModuloEvaluationStrategyFactoryBean>`
- `ModuloEvaluationStrategyFactoryBeanImpl` — per-divisor factory bean
- `DivisibilityStrategyChainOfResponsibilityHandlerImpl` — checks if the
  current divisor matches; delegates to next handler in chain if not
- `DivisibilityStrategyEvaluatorImpl` — performs `dividend % divisor`
- `DefaultAbstractDivisibilityStrategyAwareResolutionFacadeDecoratorImpl` —
  iterates the abstract provider's registered divisors through the chain

### Layer 4: Factory Bean Factories
Each concrete class has a `*FactoryBeanFactory` singleton that manages
initialization, lifecycle, and singleton access.

### Integration
The decorator is inserted as the outermost layer of the resolution facade
decorator chain, wrapping the transaction-propagating decorator. During
bootstrap, the infrastructure is initialized with factory beans registered
for divisors 3 and 5, and a chain-of-responsibility is built with divisors
[5, 3] (descending priority).

## Consequences
- The FizzBuzz computation now passes through an additional 5 layers before
  reaching the modulo operation: decorator → provider → factoryBean →
  chainHandler → evaluator → `n % d`
- Developers debugging a simple FizzBuzz evaluation will need to navigate
  through 4 additional abstraction layers and their attendant factory bean
  factories
- The chain-of-responsibility's descending divisor ordering ensures that
  divisor 5 is checked before divisor 3, though the actual outcome is still
  determined by the inner resolution facade
- Each new divisor requires registration in the abstract provider, creation
  of a factory bean, and insertion into the chain-of-responsibility
- Infrastructure initialization logging is extended with 10 additional
  diagnostic fields
