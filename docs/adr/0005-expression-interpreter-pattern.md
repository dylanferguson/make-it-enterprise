# ADR-0005: FizzBuzz Expression Language (Interpreter Pattern)

## Status
Accepted

## Context
The FizzBuzz computation logic was embedded within concrete strategy
implementations (`FizzBuzzDivisibleByThreeStrategy`, `FizzBuzzDivisibleByFiveStrategy`,
`FizzBuzzDivisibleByFifteenStrategy`), coupling business rules to strategy
selection. Future configurability of FizzBuzz rules (e.g., to support new
divisors or output labels without code changes) required a declarative,
compositional approach.

## Decision
Introduce the Interpreter pattern to define FizzBuzz rules as a composable
expression language. Each rule is expressed as an Abstract Syntax Tree (AST)
of expression nodes:

- `DivisibleByExpression(d)` — true when value `% d === 0`
- `AndExpression(left, right)` — logical conjunction
- `OrExpression(left, right)` — logical disjunction
- `NotExpression(inner)` — logical negation
- `TrueExpression` — always true (Null Object)

A `FizzBuzzRuleDefinition` associates an expression AST with an output label
and priority. Rules are collected into a `FizzBuzzRuleSet` which selects the
highest-priority matching rule for a given input.

An `FizzBuzzExpressionEvaluator` evaluates the rule set against input values
and returns the corresponding label. The evaluator is applied as a
pre-filtering decorator (`ExpressionFilteringFizzBuzzStrategyDecorator`)
wrapping each existing `IFizzBuzzStrategy`, so expression-based rules are
checked first, with fallback to the traditional strategy chain.

## Consequences
- FizzBuzz rules are now declarative and composable.
- Adding a new divisor (e.g., DivisibleBy(7) → "Bazz") requires only
  expression construction, not a new strategy class.
- An additional decorator layer increases call-stack depth by one frame.
- The `ServiceLocatorImpl` and `FizzBuzzStrategyFactoryImpl` have new
  wiring dependencies on `FizzBuzzExpressionRuleSetFactoryBeanFactory`.

## Compliance
- All `IFizzBuzzExpression` implementations MUST be immutable.
- Rule priority MUST be strictly descending (higher = evaluated first).
- The `And(DivisibleBy(3), DivisibleBy(5))` -> "FizzBuzz" rule MUST have
  priority 100 to match before the individual divisor rules.
