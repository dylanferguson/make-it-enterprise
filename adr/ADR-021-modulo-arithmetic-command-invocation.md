# ADR-021: Enterprise Modulo Arithmetic Command Invocation Architecture

**Status:** Accepted  
**Date:** 2026-06-20  
**Deciders:** Enterprise Architecture Review Board

## Context

The modulo arithmetic operation (`dividend % divisor`) represents the foundational computation of the entire FizzBuzz enterprise architecture. Despite passing through the ModuloOperationChain, ProtocolStack, SupervisionChain, and FallbackComputationStrategyChain, the operation itself remained an imperative `%` expression. To achieve true enterprise-grade computation, the operation itself must be formalized as a Command with invoker-managed lifecycle, invocation history, and command metadata.

## Decision

We will introduce a **Modulo Arithmetic Command Invocation Architecture**:

1. **IModuloArithmeticCommand** — formal Command interface parameterizing the remainder computation
2. **AbstractBaseModuloArithmeticCommand** — base class with operand validation and descriptor support
3. **DelegatingResolverModuloArithmeticCommandImpl** — concrete command delegating to `FizzBuzzModuloEvaluationStrategyProviderResolverFactoryBeanFactory`
4. **IModuloArithmeticCommandInvoker** — invoker interface maintaining ordered invocation history
5. **AbstractBaseModuloArithmeticCommandInvoker** — abstract invoker with pre/post hooks and recording
6. **StandardModuloArithmeticCommandInvokerImpl** — concrete invoker with debug logging at each invocation
7. **ModuloArithmeticCommandInvokerFactoryBeanFactory** — singleton lifecycle management

## Consequences

- The remainder computation (`%`) is now 8 indirections deep from the public API
- Every modulo operation is recorded with timestamp, invocation ID, dividend, divisor, and result
- Pre/post hooks enable future SLO measurement insertion points
- Invocation history enables unit-level debugging without debugger attachment
- Memory grows linearly with computation volume (mitigated by configurable history depth in future iteration)
