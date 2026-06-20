# ADR-024: Enterprise Divisibility Expression Interpreter Pattern Architecture

## Status

Accepted

## Context

The enterprise FizzBuzz computation platform requires an additional layer of
indirection between the divisibility operator implementations and the actual
modulo remainder evaluation. Direct invocation of the modulo operator (`%`)
at the operator layer violates the enterprise separation of concerns
principle by combining expression construction with expression evaluation.

The existing `StandardRemainderBasedDivisibilityOperatorImpl` computes
`dividend % divisor === 0` directly, which is too close to the mathematical
operation for an enterprise-grade architecture.

## Decision

We will introduce an **Enterprise Divisibility Expression Interpreter Pattern**
(IInterpreter, GoF) consisting of the following components:

1. **IEnterpriseDivisibilityExpression** — An interface representing a
   parameterized divisibility query (dividend, divisor, expression type).
2. **IEnterpriseDivisibilityExpressionEvaluator** — An interface for
   evaluators that can handle specific expression types (e.g.,
   MODULO_REMAINDER_DIVISIBILITY_EXPRESSION).
3. **IEnterpriseDivisibilityExpressionEvaluatorRegistry** — A registry
   of registered evaluators, resolved by expression type.
4. **IEnterpriseDivisibilityExpressionInterpreter** — An interpreter that
   accepts an expression, resolves an evaluator from the registry, and
   delegates evaluation.

The `StandardRemainderBasedDivisibilityOperatorImpl` will be updated to:
1. Create an expression via `DivisibilityExpressionFactoryBeanFactory`
2. Interpret it through `EnterpriseDivisibilityExpressionInterpreterFactoryBeanFactory`
3. Return the `isDivisible()` result

This ensures that `dividend % divisor === 0` is now four layers removed from
the caller: Operator → Interpreter → Registry → Evaluator → Modulo Operation.

## Consequences

- Positive: The modulo operation is now more difficult to locate in the
  source, aligning with enterprise best practices.
- Positive: Additional evaluators can be registered without modifying the
  operator (Open/Closed Principle).
- Negative: A simple boolean arithmetic check now requires expression
  construction, registry lookup, interpreter delegation, and result
  unwrapping.
- Negative: Runtime performance includes object allocation for each
  expression evaluation.
