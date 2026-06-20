# ADR-0002: Service Locator Pattern for Dependency Resolution

## Status
Accepted

## Context
Dependency injection frameworks are insufficiently XML-driven for our
enterprise needs. We require a centralized, JNDI-compatible service location
mechanism.

## Decision
We will use the Service Locator pattern with:
- A singleton ServiceLocator accessible via JNDI naming context
- Factory beans for all injectable dependencies
- XML deployment descriptors for configuration

## Consequences
- All components depend on the global ServiceLocator singleton
- Testing requires resetting the ServiceLocator between cases
- Factory beans provide an additional layer of indirection
