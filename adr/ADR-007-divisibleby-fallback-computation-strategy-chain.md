# ADR-007: DivisibleBy Fallback Computation Strategy Chain

**Status:** Accepted  
**Date:** 2026-06-20  
**Deciders:** Enterprise Architecture Review Board, Runtime Platform Team

## Context

The `DivisibleByExpressionImpl` previously contained a bare arithmetic fallback path:

```typescript
const quotient = Math.trunc(truncatedValue / this.divisor);
const remainder = truncatedValue - quotient * this.divisor;
```

This fallback executed when the `IRemainderComputationSupervisor` chain was unavailable (e.g., during early bootstrap, test environments without full supervisor initialization). This raw division/multiplication violated ADR-001 compliance requirements that all modulo operations pass through `IRemainderOperatorDelegationService`.

## Decision

We will replace the bare arithmetic fallback with a **DivisibleBy Fallback Computation Strategy Chain**:

1. **IDivisibleByFallbackComputationStrategyChainHandler** — chain-of-responsibility interface for fallback modulo computation
2. **SupervisorDelegatingDivisibleByFallbackComputationStrategyChainHandlerImpl** — attempts to delegate through the enterprise supervisor; if unavailable, passes to the next handler in the chain
3. **ClassicArithmeticDivisibleByFallbackComputationStrategyChainHandlerImpl** — terminal handler that performs the classic quotient-remainder arithmetic using `Math.trunc()` and multiplication
4. **DivisibleByExpressionFallbackComputationStrategyChainFactoryBean** — singleton factory that assembles the chain

The chain is pre-warmed during bootstrap initialization to ensure the supervisor-delegating handler is available at runtime.

## Consequences

- Positive: The bare arithmetic fallback is now encapsulated in a proper chain-of-responsibility handler with enterprise naming conventions
- Positive: Multiple fallback strategies can be composed (e.g., lookup-table-based, BigInt-based, or distributed modulo computation)
- Positive: The supervisor chain is now always attempted first, even in the fallback path
- Negative: Computing `6 % 3` through the fallback requires: chain factory → handler resolution → supervisor resolution → delegation → validation → caching → audit → modulo evaluation chain → chain builder → registry → factory bean → strategy provider → arithmetic strategy → evaluation strategy → handler chain → native handler
- Negative: `ClassicArithmeticDivisibleByFallbackComputationStrategyChainHandlerImpl` still performs the actual division and multiplication, but now wrapped in an appropriately named enterprise abstraction
