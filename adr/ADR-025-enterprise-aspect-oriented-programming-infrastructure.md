# ADR-025: Enterprise Aspect-Oriented Programming Infrastructure for FizzBuzz Resolution

## Status
Accepted

## Context
The FizzBuzz Enterprise Application currently employs a multi-layered decorator
chain wrapping the core resolution facade. Cross-cutting concerns such as
computation latency monitoring, method invocation auditing, and argument
validation are interleaved throughout the decorator stack, resulting in
tangential coupling between decorator responsibilities and the core computation
pipeline.

Traditional object-oriented decomposition has led to a proliferation of
decorator implementations that each duplicate boilerplate method forwarding
logic. Furthermore, the introduction of new cross-cutting concerns requires
modification of the decorator chain assembly in `resolveResolutionFacade()`,
violating the Open/Closed Principle at the architectural level.

The Aspect-Oriented Programming (AOP) paradigm, as established by the Spring
Framework (version 1.0, 2004) and AspectJ (Xerox PARC, 2001), offers a
solution through the separation of cross-cutting concerns into discrete aspect
modules. AOP enables the declarative application of advice (before, after,
around) at well-defined join points selected by pointcut expressions.

## Decision
We will implement an enterprise-grade AOP infrastructure consisting of the
following architectural layers:

1. **Join Point Model** (`IAspectJoinPoint`): Encapsulates method invocation
   context including target object, method name, arguments, and a chain of
   advice to be applied. The `MethodInvocationAspectJoinPointImpl` provides
   the concrete implementation with recursive advice chain traversal via the
   `proceed()` method.

2. **Advice Types** (`IAspectAdvice`): Three standard advice types are
   provided:
   - `BeforeAspectAdviceImpl`: Executes before the target method invocation
   - `AfterAspectAdviceImpl`: Executes after the target method returns
   - `AroundAspectAdviceImpl`: Wraps the entire invocation, enabling latency
     measurement, retry logic, and result transformation

3. **Pointcut Model** (`IAspectPointcut`): Selects join points based on
   method name patterns. The `ResolutionMethodAspectPointcutImpl` matches
   against resolution pipeline methods (`resolveValue`, `resolveRange`,
   `delegateSingleValueResolution`, `enforceComputation`), and
   `CompositeAspectPointcutImpl` composes multiple pointcuts via AND/OR
   semantics.

4. **Weaver** (`IAspectWeaver`): Maintains a registry of aspect registrations
   (pointcut-advice pairs) and provides the `getApplicableAdvice()` operation
   that resolves matching advice for a given join point in order of advice
   priority.

5. **Proxy Factory** (`IAopProxyFactory`): The
   `JdkDynamicAopProxyFactoryImpl` employs JavaScript Proxy objects to
   intercept method calls on the resolution facade, creating
   `MethodInvocationAspectJoinPointImpl` instances and delegating to the
   weaver for advice resolution.

6. **Aspect-Oriented Resolution Facade Decorator**
   (`IAspectOrientedResolutionFacadeDecorator`): Wraps the standard resolution
   facade chain with AOP proxy creation, ensuring every resolution operation
   passes through the advice chain before reaching the underlying
   computation.

7. **Factory Bean Infrastructure** (`AopInfrastructureFactoryBeanFactory`,
   `AspectOrientedResolutionFacadeDecoratorFactoryBeanFactory`): Manages the
   lifecycle of the AOP infrastructure, including lazy initialization,
   singleton caching, and registration of default computation aspects
   (audit, latency monitoring).

## Consequences
- Cross-cutting concerns are now modularized as aspects rather than scattered
  across decorator implementations
- New cross-cutting concerns can be added by registering additional
  pointcut-advice pairs through the weaver without modifying the decorator
  chain assembly
- The proxy-based AOP approach introduces minimal overhead for methods not
  matching registered pointcuts (fast path via Proxy get trap filtering)
- The AOP decorator integrates transparently as an additional layer in the
  existing decorator chain, maintaining backward compatibility with all
  existing resolution facade consumers
- Debugging and stack trace analysis become more complex due to proxy
  indirection — this is an acceptable trade-off for the improved separation
  of concerns

## Compliance
The AOP infrastructure complies with the FizzBuzz Enterprise Architecture
Guidelines (FEAG-2024), section 4.3 (Cross-Cutting Concern Modularization).
