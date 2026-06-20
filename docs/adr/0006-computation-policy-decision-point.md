# ADR 0006: Computation Policy Decision Point (PDP) Architecture
## Status
Accepted

## Context
The FizzBuzz Enterprise Edition requires enterprise-grade policy enforcement
governance to ensure that all value computations comply with organizational
constraints. Without a centralized Policy Decision Point (PDP), each component
would independently validate computation inputs, leading to scattered policy
logic, inconsistent enforcement, and auditability gaps.

## Decision
We will introduce a dedicated Computation Policy Decision Point (PDP) layer
that centralizes all computation policy evaluation. The PDP follows the
Policy-Based Access Control (PBAC) pattern with the following architecture:

1. IComputationPolicy — defines a single policy rule (e.g., constraint
   validation, range checking)
2. IComputationPolicyDecisionPoint — orchestrates policy evaluation across
   registered policies, returning an IComputationPolicyDecision
3. IComputationPolicyDecision — encapsulates the evaluation result with full
   audit metadata (decision code, timestamp, evaluated policies, decision
   message)

The default implementation registers a FizzBuzzConstraintValidationPolicy
that validates finite, non-negative, bounded inputs. The PDP is enforced at
the decorator level via a PolicyEnforcingValueResolverDecorator in the value
resolver chain, ensuring all computation requests pass through policy
evaluation before reaching the business logic.

## Consequences
- Positive: Centralized, auditable policy enforcement for all FizzBuzz
  computations
- Positive: Policies are independently deployable and configurable via
  property placeholders
- Positive: Full decision metadata enables enterprise audit and compliance
- Negative: Additional indirection layer in the computation path
- Negative: Policy violations manifest as ComputationPolicyViolationException
  at the decorator boundary
