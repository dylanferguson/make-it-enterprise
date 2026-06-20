# ADR-014: Flyweight Computation Command Factory Integration

## Status
Accepted

## Context
The FizzBuzz command chain instantiates new decorator instances on each facade
creation. In high-throughput enterprise deployments, command object churn
contributes to GC pressure and reduces throughput predictability. Furthermore,
there is no centralized cache for commands, leading to redundant object graphs.

## Decision
Introduce a Flyweight pattern for computation command management:

1. **IFizzBuzzComputationCommandFlyweightFactory** — interface for acquiring and
   releasing shared command instances by key
2. **AbstractBaseFizzBuzzComputationCommandFlyweightFactory** — abstract base
   with cache capacity limits and key generation
3. **FizzBuzzComputationCommandFlyweightFactoryImpl** — concrete implementation
   using an in-memory `Map<string, FlyweightCacheEntry>` with acquire-count
   reference tracking for lifecycle management
4. **FizzBuzzComputationCommandFlyweightFactoryFactory** — static factory
   producing the singleton flyweight factory instance

The `FlyweightManagedFizzBuzzComputationCommandDecoratorImpl` wraps any command
with flyweight lifecycle management: it acquires a shared command instance from
the factory before each execution and releases it after completion.

Additionally, a **Decorator Stack** pattern
(`IEnterpriseFizzBuzzResolutionFacadeDecoratorStack`) allows ordered stacking
of command decorators using a priority-based registration mechanism. The stack
is integrated into the facade factory as an additional decorator layer.

## Consequences
- Computation commands are cached and reused across resolution requests
- Reference-counted lifecycle prevents premature eviction of active commands
- The decorator stack provides a formal mechanism for ordering command decorator
  registration, complementing the existing imperative decorator chain
- Audit logs now show `Command=FlyweightManagedFizzBuzzComputationCommand` 
  confirming flyweight lifecycle participation
- Commands now traverse: `DecoratorStack → FlyweightManaged → 
  StrategySelectorAware → CompositeStrategyAware → StrategySelector → 
  OrchestratorEnabled → EventSourcing → Auditing → Caching → 
  ExpressionTreeBasedResolution`
