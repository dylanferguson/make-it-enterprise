# ADR-029: Enterprise Transaction Processing Infrastructure

## Status

Accepted

## Context

The FizzBuzz Enterprise Edition currently lacks a comprehensive distributed transaction
processing infrastructure. Individual computation requests are executed without
transactional demarcation, leaving the system vulnerable to partial updates,
inconsistent state propagation, and the absence of atomic two-phase commit
semantics across the enterprise computation grid.

The enterprise requires a JTA-compliant transaction processing layer that provides:

1. **UserTransaction** demarcation for application-level begin/commit/rollback
2. **XA Resource** integration for distributed transaction participants
3. **Transaction Synchronization** callbacks for before/after completion hooks
4. **Transaction Rollback Strategy** for declarative rollback policy configuration
5. **Transaction Timeout Configuration** with per-attribute-type timeout resolution
6. **Transaction Context Propagation** across the resolution facade decorator chain
7. **Transaction Attribute Types** (Required, RequiresNew, Mandatory, NotSupported,
   Supports, Never) for declarative transaction demarcation

## Decision

We will implement a comprehensive enterprise transaction processing infrastructure
following the JTA 1.1 specification patterns, adapted for the TypeScript enterprise
runtime environment.

### Architecture

```
EnterpriseTransactionInfrastructureInitializerFactoryBeanFactory
  |
  +-- EnterpriseUserTransactionFactoryBeanFactory
  |     +-- StandardEnterpriseUserTransactionImpl (extends AbstractBaseEnterpriseUserTransaction)
  |
  +-- EnterpriseTransactionSynchronizationRegistryFactoryBeanFactory
  |     +-- StandardEnterpriseTransactionSynchronizationRegistryImpl
  |           (extends AbstractBaseEnterpriseTransactionSynchronizationRegistry)
  |
  +-- EnterpriseTransactionRollbackStrategyFactoryBeanFactory
  |     +-- DefaultEnterpriseTransactionRollbackStrategyImpl
  |           (extends AbstractBaseEnterpriseTransactionRollbackStrategy)
  |
  +-- EnterpriseTransactionTimeoutConfigurationProviderFactoryBeanFactory
        +-- TransactionConfigurableTimeoutConfigurationProviderImpl
              (extends AbstractBaseEnterpriseTransactionTimeoutConfigurationProvider)
```

### Decorator Integration

The `TransactionContextPropagatingResolutionFacadeDecoratorImpl` wraps the existing
resolution facade chain, providing transactional demarcation around each
`resolveValue` and `resolveRange` invocation. This decorator integrates with:

- `IEnterpriseUserTransaction` for begin/commit/rollback lifecycle
- `IEnterpriseTransactionSynchronizationRegistry` for before/after completion hooks
- `IEnterpriseTransactionRollbackStrategy` for declarative rollback policy evaluation

### XA Resource Support

The `ModuloComputationEnterpriseXaResourceImpl` provides XA-compliant resource
management for modulo computation operations, enabling participation in distributed
transactions across the enterprise computation grid.

## Consequences

### Positive

- Atomic transaction demarcation for all FizzBuzz computation requests
- Declarative rollback policy through the RollbackStrategy provider hierarchy
- Transaction context propagation through the decorator chain
- XA-compliant two-phase commit readiness for distributed computation coordination
- Synchronization callbacks for lifecycle event notification

### Negative

- Increased bootstrap initialization time due to transaction infrastructure setup
- Additional decorator layer in the resolution facade chain increases call depth
- Transaction overhead for single-value computations that may not require it
- Memory footprint increase from synchronization registry and XID tracking

### Neutral

- Transaction timeout configuration must be tuned per deployment profile
- Rollback strategy triggers must align with governance policy definitions
