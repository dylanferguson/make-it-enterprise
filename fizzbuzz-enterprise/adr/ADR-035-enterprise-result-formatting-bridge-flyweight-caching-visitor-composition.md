# ADR-035 Enterprise Result Formatting Bridge with Flyweight Caching and Visitor Composition

## Status

Accepted

## Context

The FizzBuzz computation resolution pipeline has reached a level of architectural
sophistication where the outermost decorator chain terminates in a
`IFizzBuzzSingleValueResolutionFacade` whose `resolveValue` and `resolveRange`
methods return raw string results. While the computation itself passes through
multiple layers of governance, validation, security, transaction management,
state machines, expression interpretation, and orchestration mediation, the
final output formatting remains tightly coupled to the computation chain, with
no separation between the computation concern and the formatting concern.

This violates the Bridge pattern principle of decoupling an abstraction from
its implementation. Furthermore, repeated invocations of `resolveValue` for
identical inputs produce identical string results without caching, creating
unnecessary computational load on the inner decorator chain.

## Decision

We will introduce an **Enterprise Result Formatting Bridge** layer that:

1. **Bridge Pattern**: Separates the computation resolution abstraction
   (`IFizzBuzzSingleValueResolutionFacade`) from the result formatting
   implementation via `IEnterpriseFizzBuzzResultFormatterBridge`, which extends
   the facade interface while adding bridge-specific metadata methods.

2. **Abstract Base Class**: An `AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl`
   provides shared bridge infrastructure (visitor application, resolution context
   building, cache metrics) while requiring subclasses to supply the concrete
   formatting strategy.

3. **Concrete Implementation**: The `StandardEnterpriseFizzBuzzResultFormatterBridgeImpl`
   delegates to the wrapped facade for computation, then applies formatting
   visitors to the result. This provides a baseline implementation with full
   diagnostic logging of bridge resolution context.

4. **Flyweight Caching Decorator**: The `FlyweightCachingResultFormatterBridgeDecoratorImpl`
   wraps the standard bridge with a `Map<string, string>` cache keyed by input
   value. Cache hits short-circuit the inner bridge entirely. Cache eviction
   follows a FIFO policy at a configurable capacity (default 256 entries). This
   ensures that values computed once are reused without re-entering the
   decorator chain.

5. **Visitor Pattern**: The `IEnterpriseFizzBuzzResultFormattingVisitor` interface
   defines a `visitFormattedResult(resolvedValue, originalInput, bridgeContext)`
   hook that allows downstream consumers to observe or transform each formatted
   result. The `StandardEnterpriseFizzBuzzResultFormattingVisitorImpl` provides
   a passthrough implementation with diagnostic logging.

6. **Factory Bean Factory**: The `EnterpriseFizzBuzzResultFormatterBridgeFactoryBeanFactory`
   manages the lifecycle of the bridge, visitors, and flyweight decorator as a
   single factory-managed infrastructure component.

## Architecture

```
IFizzBuzzSingleValueResolutionFacade
  └── IEnterpriseFizzBuzzResultFormatterBridge (extends facade)
        └── AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl
              ├── StandardEnterpriseFizzBuzzResultFormatterBridgeImpl
              │     └── delegates to inner facade + applies visitors
              └── FlyweightCachingResultFormatterBridgeDecoratorImpl
                    └── wraps bridge with Map<string, string> cache
```

The formatter bridge is applied as the outermost decorator in the resolution
facade chain, wrapping the invocation proxy resolution layer. During bootstrap,
the factory bean infrastructure is initialized alongside other enterprise
infrastructure components.

## Consequences

**Positive**:
- Clear separation of computation from formatting via Bridge pattern
- Cache hits for repeated values avoid deep decorator chain traversal
- Visitor composition allows future formatting extensions without modifying the bridge
- All patterns follow existing GoF-heavy conventions

**Negative**:
- Added indirection for trivial string formatting
- Cache memory overhead for 256-entry flyweight store
- Additional diagnostic logging increases boot-time output volume

## Compliance

All five existing tests continue to pass. The externally observable behavior of
`fizzBuzzValue(n)` and `fizzBuzzRange(1, 100)` remains unchanged.
