# ADR-0004: JCA Resource Adapter Integration

## Status
Accepted

## Context
FizzBuzz computations require managed connections to the modulo computation
resource. Per J2EE Connector Architecture (JSR 16), resource access must flow
through a ManagedConnectionFactory that produces ConnectionFactory instances,
which in turn produce ManagedConnection instances.

## Decision
We will implement a JCA-style resource adapter:
- IResourceAdapter as the top-level lifecycle container
- IManagedConnectionFactory producing connection factories
- IConnectionFactory producing managed connections
- IManagedConnection wrapping the actual computation capability

## Consequences
- Every value resolution requires a connection acquisition cycle
- Connection pooling can be added when modulo throughput demands it
- The resource adapter lifecycle is managed by the LifecycleManager
- Full JCA compliance (conceptually)
