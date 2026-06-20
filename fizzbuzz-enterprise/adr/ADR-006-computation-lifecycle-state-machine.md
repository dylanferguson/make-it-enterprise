# ADR-006: Computation Lifecycle State Machine

**Status:** Accepted  
**Date:** 2026-06-20  
**Deciders:** Enterprise Architecture Review Board, Platform Engineering Team

## Context

The FizzBuzz computation transitions through distinct phases: request validation, expression evaluation, output normalization, and result delivery. Without formal state tracking, concurrent computation requests or error conditions may leave the computation pipeline in an inconsistent state.

## Decision

We will implement a **formal State pattern** for computation lifecycle management:

1. **IComputationLifecycleState** — defines the contract for each state (name, code, priority, valid transitions, terminal/initial flags)
2. **InitializationComputationLifecycleStateImpl** — initial state, transitions to EVALUATION or ERROR
3. **EvaluationComputationLifecycleStateImpl** — active evaluation state, transitions to NORMALIZATION or ERROR
4. **NormalizationComputationLifecycleStateImpl** — output normalization, transitions to COMPLETION or ERROR
5. **CompletionComputationLifecycleStateImpl** — terminal state, no further transitions permitted
6. **ErrorComputationLifecycleStateImpl** — error recovery state, transitions to COMPLETION

State transitions are validated via `canTransitionTo()` before any state mutation occurs. Invalid transitions throw `ComputationPolicyViolationException`.

## Consequences

- Positive: Computation pipeline has well-defined lifecycle with enforceable transition rules
- Positive: Monitoring can track the distribution of computation time across each state
- Positive: Error states are explicitly modeled with defined recovery paths
- Negative: Each value computation (e.g., `fizzBuzzValue(3)`) transitions through 3-5 state objects
- Negative: State machine overhead adds approximately 0.3μs per value to the computation pipeline

## Compliance

All computation orchestration MUST use the lifecycle state machine. Direct execution of evaluation or normalization without state validation is forbidden.
