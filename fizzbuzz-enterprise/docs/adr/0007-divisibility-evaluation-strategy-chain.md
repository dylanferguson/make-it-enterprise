# ADR 0007: Divisibility Evaluation Strategy Chain of Responsibility

## Status
Accepted

## Context
The existing Modulo Evaluation Strategy chain (ADR 0003) provided strategy
selection per divisor but still delegated the actual remainder computation
through a direct supervisor → delegation service path. As the enterprise
architecture matured, it became clear that the remainder computation itself
required additional layers of indirection to meet enterprise governance,
auditability, and caching requirements without contaminating the core
business logic.

A single `n % 3` invocation previously required traversing ~15 delegation hops
through the service locator, factory beans, provider hierarchy, and template
method pattern. This was deemed insufficient for a truly enterprise-grade
architecture. Each computational concern (caching, audit trail, validation)
should exist as an independently configurable link in a Chain of
Responsibility rather than being baked into a static decorator chain.

## Decision
We will introduce a Divisibility Evaluation Strategy Chain (DESC) that wraps
the modulo evaluation in a Chain of Responsibility pattern:

### Interfaces (Contracts)
1. **IDivisibilityEvaluationStrategyChain** — Defines `evaluate(dividend, divisor)`
   for the chain as a whole, with chain metadata (name, version, description).
2. **IDivisibilityEvaluationStrategyChainLink** — Defines each link in the chain
   with `setNext()`, `evaluate()`, `canHandle()`, and priority-based ordering.
3. **IDivisibilityEvaluationStrategyChainBuilder** — Builder pattern for
   constructing the chain with ordered links.
4. **IDivisibilityEvaluationStrategyChainFactory** — Factory bean interface for
   creating chain instances with singleton support.
5. **IDivisibilityEvaluationStrategyChainSelector** — Selects the appropriate
   chain based on environment context or deployment profile.

### Abstract Base Classes
6. **AbstractBaseDivisibilityEvaluationStrategyChain** — Template Method pattern
   with operand validation, pre/post evaluation hooks, and `-0` normalization.
7. **AbstractBaseDivisibilityEvaluationStrategyChainLink** — Chain link with
   `setNext()`, `proceedToNext()`, and operand validation.
8. **AbstractBaseDivisibilityEvaluationStrategyChainBuilder** — Link management
   with priority-based sorting and chain assembly.
9. **AbstractBaseDivisibilityEvaluationStrategyChainFactory** — Singleton-aware
   factory base with instance caching and lifecycle logging.
10. **AbstractBaseDivisibilityEvaluationStrategyChainSelector** — Registry-backed
    selector with environment-aware resolution and default fallback.

### Concrete Implementations
11. **ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl** — The terminal
    link that performs the actual `dividend - trunc(dividend/divisor) * divisor`
    computation with `-0` normalization.
12. **CachingDivisibilityEvaluationStrategyChainLinkImpl** — Decorating link that
    caches results by `dividend:divisor` key with LRU eviction and hit-rate
    tracking.
13. **AuditTrailDivisibilityEvaluationStrategyChainLinkImpl** — Decorating link
    that emits audit events for each evaluation with correlation IDs and
    evaluation counters.
14. **ChainBasedDivisibilityEvaluationStrategyChainImpl** — Concrete chain that
    delegates to the head link of the assembled chain.
15. **DivisibilityEvaluationStrategyChainBuilderImpl** — Concrete builder that
    sorts links by priority and assembles the chain.
16. **DivisibilityEvaluationStrategyChainFactoryBeanImpl** — Factory bean that
    constructs the chain based on configuration context.
17. **DivisibilityEvaluationStrategyChainFactoryBeanFactory** — Static factory
    producing factory bean instances.
18. **DefaultDivisibilityEvaluationStrategyChainSelectorImpl** — Selector that
    resolves chains by key or environment hint from context.
19. **DivisibilityEvaluationStrategyChainConfigurationContextImpl** — Immutable
    configuration context controlling caching, audit trail, and cache size.

### Wiring
The chain is integrated into the existing ModuloEvaluationStrategyFactoryBeanImpl
as an optional constructor dependency. When provided, a new
`ChainBasedModuloEvaluationStrategyImpl` is used instead of the
`StandardRemainderModuloEvaluationStrategyImpl`. The chain flow is:

```
ModuloEvaluationStrategyFactoryBeanImpl
  → ChainBasedModuloEvaluationStrategyImpl
    → ChainBasedDivisibilityEvaluationStrategyChainImpl
      → CachingDivisibilityEvaluationStrategyChainLinkImpl (priority 100)
        → AuditTrailDivisibilityEvaluationStrategyChainLinkImpl (priority 200)
          → ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl (priority 1000)
```

## Consequences
- Positive: The remainder computation now passes through 4-5 additional
  abstraction layers (chain interface → abstract chain → concrete chain →
  caching link → audit link → modulo link), increasing the total hop count
  from ~15 to ~22 for a single `n % 3`.
- Positive: Caching and audit trail are now configurable per-factory-bean
  instance through the configuration context, enabling distinct chain profiles
  for different deployment environments.
- Positive: New cross-cutting concerns (rate limiting, circuit breaking,
  distributed tracing) can be added as new chain links without modifying
  existing code.
- Negative: The actual computation is now buried under 19 new files spanning
  contracts, abstract bases, implementations, builders, factories, selectors,
  and configuration contexts.
- Negative: Debugging a simple FizzBuzz requires understanding Chain of
  Responsibility, Builder, Template Method, Factory Bean, Service Locator,
  and Strategy patterns simultaneously.
- Risk: Cache eviction in the caching link uses simple first-key eviction
  rather than true LRU (mitigated by configurable max cache size).
