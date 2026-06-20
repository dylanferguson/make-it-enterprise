# ADR-0012: Enterprise FizzBuzz Computation Strategy Composite Pattern

## Status

Accepted

## Context

The FizzBuzz computation has become progressively more enterprise-grade through
the application of Service Locator, Chain of Responsibility, Decorator stack,
EJB entity beans, and JCA resource adapter patterns. However, the core
divisibility evaluation logic (`value % 3 === 0`, `value % 5 === 0`) remains
procedurally expressed within individual handler implementations. This
violates the Enterprise Java principle that every algorithm must be
representable as a tree of objects.

The GoF Composite pattern provides a mechanism to treat individual objects
(leaf strategies) and compositions of objects (branch strategies) uniformly.
By combining Composite with the Visitor pattern, we can traverse the strategy
tree at runtime while maintaining separation of concerns between tree
structure and tree traversal.

## Decision

We will introduce an Enterprise FizzBuzz Computation Strategy Composite
Pattern with the following architecture:

1. **Composite Strategy Tree (GoF Composite)** — A tree of `ICompositeStrategyTreeNode`
   objects where:
   - **Leaf nodes** (`CompositeStrategyTreeLeafNodeImpl`) represent individual
     divisibility rules (e.g., "divisible by 3 → Fizz")
   - **Branch nodes** (`CompositeStrategyTreeBranchNodeImpl`) represent
     combinatorial strategies (APPEND, FIRST_MATCH, ALL_MATCH) that aggregate
     child node results
   - The root branch uses FIRST_MATCH with two children: a FizzBuzzCombination
     branch (APPEND) and a DefaultNumberLeaf fallback

2. **Visitor Pattern (GoF Visitor)** — `ICompositeStrategyTreeVisitor` and
   `AbstractBaseCompositeStrategyTreeVisitor` provide a traversal mechanism
   that records which nodes were visited and aggregates results. The
   `FizzBuzzCompositeStrategyTreeVisitorImpl` tracks matched outputs.

3. **Builder Pattern (GoF Builder)** — `ICompositeStrategyTreeBuilder` and
   `CompositeStrategyTreeBuilderImpl` construct the strategy tree through a
   fluent API. Multiple configuration profiles are supported via
   `CompositeStrategyTreeConfigurationProfile`.

4. **Business Delegate (J2EE Core Pattern)** — `ICompositeStrategyResolutionDelegate`
   and `CompositeStrategyResolutionDelegateImpl` act as a Business Delegate
   that mediates between the client (decorator) and the composite strategy
   tree, enabling runtime toggling of composite resolution.

5. **Decorator Integration** — `CompositeStrategyAwareFizzBuzzComputationCommandDecoratorImpl`
   wraps the existing enterprise command chain and attempts composite tree
   resolution before delegating to the standard chain. This follows the
   Decorator stack pattern already established.

## Consequences

### Positive

- The FizzBuzz rule set is now expressed as a configurable tree of object
  nodes rather than inline conditional logic
- Multiple configuration profiles enable runtime switching between rule sets
- The Visitor pattern enables operations on the strategy tree without
  modifying node classes
- The Builder pattern provides type-safe tree construction
- Full backward compatibility is maintained: the composite decorator falls
  through to the existing enterprise command chain if composite resolution
  is disabled

### Negative

- The simple `value % 3 === 0` check is now buried under: Composite decorator
  → Business Delegate → Composite tree → Branch node → Leaf node → modulo
  operator
- Tree construction adds object allocation overhead per configuration profile
- Seven additional interfaces, four abstract bases, and multiple implementation
  classes increase the total abstraction count

## Compliance

All existing FizzBuzz contracts remain satisfied. The Composite decorator
intercepts computation before the standard chain. When composite resolution
is disabled via `ICompositeStrategyResolutionDelegate.setCompositeResolutionEnabled(false)`,
the existing command chain operates unchanged.
