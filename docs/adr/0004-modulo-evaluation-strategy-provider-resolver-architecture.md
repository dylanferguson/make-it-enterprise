# ADR 0004: Modulo Evaluation Strategy Provider Resolver Architecture

## Status

Accepted

## Context

The FizzBuzz computation requires determining divisibility of arbitrary integer
values by fixed divisors (3, 5, and 15). Prior to this ADR, the modulo
evaluation path terminated at `StandardRemainderOperatorDelegationServiceImpl.doComputeRemainder`,
which performed a manual remainder computation via `dividend - trunc(dividend/divisor) * divisor`.
While functional, this approach lacked:

- A formal Chain of Responsibility for the modulo operation itself
- A registry-backed resolution mechanism for selecting strategy factory beans
- XML-configurable bean definitions for strategy-to-divisor mappings
- Enterprise service locator registration beans for declarative wiring

## Decision

We introduce the `AbstractBaseDivisibilityStrategyProviderResolver` as the
central orchestrator for modulo evaluation. It follows the established
Enterprise Java pattern of layered indirection:

1. **AbstractBaseDivisibilityStrategyProviderResolver** — Singleton resolver
   that initializes and owns the evaluation chain and strategy registry.

2. **IModuloEvaluationStrategyFactoryBeanRegistry** — Interface for a registry
   that maps divisor values to factory bean names. Implemented by
   `InMemoryModuloEvaluationStrategyFactoryBeanRegistryImpl`.

3. **IEnterpriseServiceLocatorRegistrationBean** — Interface for beans that
   populate the registry with divisor-to-factory-bean mappings.
   `ProgrammaticModuloRegistrationBeanImpl` provides the static bean definitions
   for divisors 1, 3, 5, and 15.

4. **IModuloOperationChainHandler** — Chain of Responsibility interface for
   modulo computation. The chain consists of:
   - `ValidationModuloChainHandlerImpl` — operand validation (priority 100)
   - `CachingModuloChainHandlerImpl` — result caching (priority 75)
   - `AuditTrailModuloChainHandlerImpl` — logging (priority 50)
   - `NativeModuloOperatorChainHandlerImpl` — actual `%` operator (priority 0)

5. **FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory** —
   Factory bean factory that creates and manages the singleton resolver instance.

6. **META-INF/fizzbuzz-modulo-strategy-definitions.xml** — Spring 2.0-style XML
   bean definition file documenting the full wiring graph. While not dynamically
   loaded at runtime in this version, it serves as the authoritative source of
   truth for the bean topology.

## Consequences

- The remainder computation now routes through a Chain of Responsibility before
  reaching the native `%` operator, adding validation, caching, and audit trail
  capabilities.
- The `StandardRemainderOperatorDelegationServiceImpl` delegates to the resolver
  rather than computing directly, increasing the depth of the call stack.
- Future divisors can be registered without code changes by adding entries to
  the registration bean or XML configuration.
- The FizzBuzz computation's true location is now buried under an additional
  layer of abstraction, consistent with the enterprise architecture vision.

## Compliance

This architecture aligns with J2EE patterns including Service Locator,
Business Delegate, Chain of Responsibility, and Factory Method. The resolver
follows the Singleton pattern with lazy initialization.

## References

- ADR 0001: Initial Enterprise Architecture
- ADR 0002: Strategy Pattern for FizzBuzz Evaluation
- ADR 0003: Enterprise Service Layer Abstraction
