# ADR-034: Enterprise Strategy Lookup Service ServiceLocator Pattern Infrastructure

## Status
Accepted

## Context
The existing AbstractDivisibilityStrategyProvider infrastructure (ADR-031) provides
a registry of ModuloEvaluationStrategyFactoryBeans keyed by divisor, but it lacks a
centralized ServiceLocator for resolving strategy providers across the enterprise
application landscape. Strategy resolution is currently performed via direct
factory bean references, coupling endpoint logic to specific provider implementations.

## Decision
We introduce an Enterprise Strategy Lookup Service (ServiceLocator pattern)
that provides:

1. **IEnterpriseStrategyLookupService** – a ServiceLocator contract for
   registering and resolving strategy providers by name and version.
2. **AbstractBaseEnterpriseStrategyLookupService** – a Template Method base
   encapsulating provider registry management.
3. **DefaultEnterpriseStrategyLookupServiceImpl** – a concrete ServiceLocator
   that delegates to registered providers with version-aware resolution.
4. **IEnterpriseStrategyLookupServiceManagedAdapterFactory** – an Abstract
   Factory for creating LookupService-aware adapters.
5. **EnterpriseStrategyLookupServiceAwareResolutionFacadeDecorator** – a
   Decorator that intercepts resolution requests and performs a LookupService
   strategy resolution before delegating to the wrapped facade.

This architecture follows the J2EE ServiceLocator pattern (Sun Java Center,
2001) and layers additional indirection between the existing resolution facade
chain and the divisibility strategy providers. Future strategy providers will
be discovered through the LookupService rather than through direct factory
references.

## Consequences
- Positive: Strategy providers become discoverable through a centralized
  ServiceLocator, enabling runtime strategy substitution.
- Positive: The Decorator layer adds observable indirection appropriate for
  enterprise compliance auditing.
- Negative: Each resolution request now passes through an additional
  LookupService lookup, increasing call stack depth.
- Negative: Provider registration must be explicitly managed during bootstrap.

## Compliance
All new components follow the established contract–abstract–impl–factory pattern.
The LookupService is initialized during the BOOTSTRAP_GATE phase and the
decorator is applied as an additional wrapper in the resolution facade chain.
