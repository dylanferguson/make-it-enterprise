# ADR-009: Enterprise Message Template Codec Configuration Architecture

## Status

Accepted

## Context

The FizzBuzzEnterpriseEdition application has reached a level of indirection where
the core FizzBuzz computation is routed through multiple layers of factories,
decorators, chains, bridges, supervisors, and service locators. However, certain
critical string literals remained unconquered by abstraction:

- `"Fizz"`, `"Buzz"`, `"FizzBuzz"` — the canonical output templates
- `"DIVISIBLE"`, `"NOT_DIVISIBLE"` — the divisibility evaluation result codes

These values were hardcoded in `FizzBuzzOutputFormatterImpl`,
`FizzBuzzExpressionRuleSetFactoryBeanFactory`,
`AbstractBaseFizzBuzzExpressionEvaluator`, `DivisibilityCheckVisitor`, and
`DivisibilityEvaluationCommand`. Changes to output labels required source code
modification, recompilation, and redeployment — an unacceptable coupling in an
enterprise-grade system.

## Decision

We introduce a **configurable, multi-source Message Template Codec Configuration
architecture** with the following layers:

### 1. Property Resolution Chain (Chain of Responsibility)

An `IMessagePropertyResolutionChain` aggregates registered
`IEnterpriseMessagePropertyConfigurationSource` implementations, ordered by
descending priority:

| Priority | Source | Description |
|----------|--------|-------------|
| 75 | `SystemEnvironmentMessagePropertyConfigurationSourceImpl` | Reads from `FIZZBUZZ_MESSAGE_*` environment variables |
| 50 | `DeploymentDescriptorMessagePropertyConfigurationSourceImpl` | Resolves from deployment descriptor XML |
| 25 | `StaticDefaultMessagePropertyConfigurationSourceImpl` | Built-in defaults |

The chain iterates through sources and returns the first non-null match.

### 2. Message Template Codec Provider

`IMessageTemplateCodecProvider` exposes typed accessor methods:
`getFizzTemplate()`, `getBuzzTemplate()`, `getFizzBuzzTemplate()`,
`getDivisibleResultTemplate()`, `getNotDivisibleResultTemplate()`. The default
implementation (`DefaultMessageTemplateCodecProviderImpl`) resolves each template
through the property chain with a hardcoded fallback.

### 3. Integration Points

- **`AbstractBaseFizzBuzzOutputFormatter`** now accepts an optional
  `IMessageTemplateCodecProvider` and delegates `formatFizz()` / `formatBuzz()` /
  `formatFizzBuzz()` to it.
- **`AbstractBaseFizzBuzzExpressionEvaluator`** resolves comparison labels from
  the codec provider instead of comparing against hardcoded `"Fizz"` etc.
- **`FizzBuzzExpressionRuleSetFactoryBeanFactory`** uses the codec provider to
  set rule output labels.
- **`DivisibilityCheckVisitor`** and **`DivisibilityEvaluationCommand`** resolve
  `"DIVISIBLE"` / `"NOT_DIVISIBLE"` from the codec provider.
- **Bootstrap gate** initializes the property resolution chain and codec provider
  during application startup.

### 4. Property Key Naming Convention

```
message.template.codec.fizz              → "Fizz"
message.template.codec.buzz              → "Buzz"
message.template.codec.fizzbuzz          → "FizzBuzz"
message.template.codec.divisible.result  → "DIVISIBLE"
message.template.codec.not.divisible.result → "NOT_DIVISIBLE"
```

Environment variables use the convention `FIZZBUZZ_MESSAGE_<KEY>` (dots replaced
with underscores, uppercase).

## Consequences

### Positive

- Output labels are now configurable at deployment time via environment variables
  without code changes.
- Future property sources (database, configuration server, JNDI) can be added
  without modifying existing sources.
- The template strings are resolved through a single, auditable code path.

### Negative

- Every component that needs a string template now depends (directly or
  transitively) on the `IMessageTemplateCodecProvider` interface.
- Startup time increases marginally due to property chain initialization.

### Neutral

- The `"DIVISIBLE"` and `"NOT_DIVISIBLE"` internal protocol strings are now
  configurable, creating a possible misconfiguration risk if changed without
  corresponding changes in downstream components that rely on string equality.
