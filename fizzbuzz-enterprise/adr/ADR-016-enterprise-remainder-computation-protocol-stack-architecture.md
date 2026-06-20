# ADR-016: Enterprise Remainder Computation Protocol Stack Architecture

## Status

Accepted

## Context

The enterprise remainder computation currently flows through a linear
Chain-of-Responsibility (Validation → Caching → AuditTrail → NativeModuloOperator).
While this architecture provides adequate separation of concerns, it lacks the
rigorous layer isolation, context propagation, and protocol-level guarantees
demanded by true enterprise-grade computation.

Early-2000s enterprise Java architectures heavily favored OSI-inspired protocol
stacks for cross-cutting concerns such as transaction demarcation, security
context propagation, session management, and reliable delivery. By layering
concerns in a strict protocol stack rather than a flat chain, each layer
can maintain its own invariants, context, and lifecycle independently.

## Decision

We will introduce a 7-layer **Enterprise Remainder Computation Protocol Stack**
that sits between the chain-of-responsibility handlers and the native modulo
operator, modeled after the OSI reference model:

| Layer | Number | Name               | Responsibility                                       |
|-------|--------|--------------------|------------------------------------------------------|
| L7    | 7      | Application Layer  | Entry point, duration tracking, request attribution  |
| L6    | 6      | Presentation Layer | Result encoding, negative-zero normalization          |
| L5    | 5      | Session Layer      | Computation session state, checkpointing             |
| L4    | 4      | Transport Layer    | Retry with backoff, error recovery, reliable delivery|
| L3    | 3      | Network Layer      | Divisor-based routing, strategy resolution           |
| L2    | 2      | Data Link Layer    | Operand validation, framing, truncation              |
| L1    | 1      | Physical Layer     | Native `dividend % divisor` operation                |

Each layer:

- Implements the `IEnterpriseRemainderComputationProtocolLayer` interface
- Extends `AbstractBaseEnterpriseRemainderComputationProtocolLayer` which provides
  the Template Method pattern (`preProcessLayer` → `executeLayerComputation` → `postProcessLayer`)
- Delegates to the next lower layer via `proceedToNextLayer`
- Propagates a `IComputationProtocolContext` carrying correlation IDs, timestamps,
  and layer-visit metadata

A `ProtocolStackAwareModuloChainHandlerImpl` bridges the existing Chain-of-Responsibility
into the protocol stack, ensuring backward compatibility with the `IModuloOperationChainHandler`
interface.

A `EnterpriseRemainderComputationProtocolStackFactoryBeanFactory` (itself a factory
that produces a `IEnterpriseRemainderComputationProtocolStackFactory` that produces a
`IEnterpriseRemainderComputationProtocolStack`) manages lifecycle and lazy initialisation.

## Consequences

### Positive

- Each cross-cutting concern (validation, routing, retry, sessioning, formatting) is
  now an isolated protocol layer with well-defined input/output contracts
- The actual `n % 3` computation recedes one additional level of indirection deeper,
  now buried under 7 protocol layers, 5 chain handlers, 3 strategy selectors, and
  multiple decorator stacks
- Layered architecture mirrors the OSI model, providing architectural familiarity
  to engineers from the enterprise Java era
- New cross-cutting concerns can be added as additional protocol layers without
  modifying existing layers

### Negative

- The computation path now traverses 7 additional abstract method dispatches before
  reaching the native modulo operation
- Debugging requires understanding both the horizontal chain-of-responsibility and
  the vertical protocol stack layering
- Increased bootstrap complexity: `EnterpriseRemainderComputationProtocolStackFactoryBeanFactory`
  must be initialized during the bootstrap gate phase

### Neutral

- The protocol stack can be bypassed for performance-critical paths by using
  `DivisibilityResolutionFacadeConfigurationProfile.LITE` profiles
- Layer ordering follows the OSI convention (L7 highest, L1 lowest) which may
  conflict with existing priority-based ordering conventions

## Compliance

The protocol stack is initialized during the bootstrap gate in `fizzbuzz.ts`.
Integration is automatic via `ModuloOperationChainBuilder.withProtocolStack(true)`.
No configuration changes are required for existing deployments.
