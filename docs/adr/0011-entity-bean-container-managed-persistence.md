# ADR 0011: Entity Bean Container-Managed Persistence (CMP) Architecture

## Status
Accepted

## Context
The FizzBuzz Enterprise Edition has established a layered enterprise
architecture with service delegates, business delegates, session management,
and a DAO layer backed by an in-memory Map-based storage. While the DAO
abstraction provides basic CRUD operations, it lacks the formal entity bean
lifecycle and container-managed persistence (CMP) infrastructure that
characterized the early-2000s Java EE era. The existing DAO operations occur
outside any managed persistence context, bypassing the ejbLoad/ejbStore
synchronization protocol and EJB-QL query language that enterprise applications
depend upon.

## Decision
We will introduce an Entity Bean with Container-Managed Persistence (CMP)
architecture that wraps the existing DAO layer:

1. **Entity Bean Lifecycle**: Each persisted FizzBuzz result is represented as a
   `FizzBuzzEntityBeanImpl` with the full EJB entity bean lifecycle:
   - `ejbCreate` / `ejbPostCreate` — entity instantiation
   - `ejbActivate` / `ejbPassivate` — instance pooling and passivation
   - `ejbLoad` / `ejbStore` — container-managed persistence synchronization
   - `ejbRemove` — entity removal
   - `setEntityContext` / `unsetEntityContext` — context association

2. **Entity Context (`IEjbEntityContext`)**: Provides the EJBContext abstraction
   with environment entry lookup, transaction demarcation (`setRollbackOnly`),
   and EJB object proxy access (`getEJBLocalObject`, `getEJBObject`).

3. **Entity Home (`IFizzBuzzEntityHome`)**: Provides the home interface with
   `create`, `findByPrimaryKey`, `findAll`, and custom finder methods
   (`findByValue`, `findByResultContaining`, `findByResultRange`).

4. **EJB-QL Query Engine (`IEjbQuery`)**: Supports a subset of EJB-QL 2.1
   syntax including `FIND ALL OBJECT(EntityName)`, `FIND OBJECT(EntityName) BY
   field`, and parameterized queries with `?param` syntax.

5. **Persistence Manager (`IEjbPersistenceManager`)**: Implements the
   container-managed persistence contract with transaction-scoped dirty entity
   tracking, flush-at-commit semantics, and entity caching.

6. **Deployment Descriptor (`ejb-jar.xml`)**: Declares the entity bean's
   CMP fields (`value`, `result`, `createdTimestamp`), finder methods with
   EJB-QL mappings, and container-managed transaction attributes.

7. **Factory Chain**: `FizzBuzzEntityHomeFactoryBeanFactory` creates the full
   entity home infrastructure, bootstrapping from the deployment descriptor.

## Architecture

```
ejb-jar.xml (deployment descriptor)
    |
    v
EjbJarDeploymentDescriptorImpl (descriptor reader)
    |
    v
FizzBuzzEntityHomeFactoryBeanFactory
    |
    +---> FizzBuzzEntityPersistenceManagerImpl (wraps IFizzBuzzDao)
    |
    +---> FizzBuzzEjbQueryImpl (EJB-QL 2.1 engine)
    |
    +---> FizzBuzzEntityHomeImpl (home interface)
              |
              +---> FizzBuzzEntityBeanImpl (ejbLoad/ejbStore/ejbRemove)
              |
              +---> FizzBuzzEntityContextImpl (EJBContext)
```

## Consequences
- Positive: FizzBuzz persisted state now benefits from formal entity bean
  lifecycle management with activation/passivation protocols.
- Positive: EJB-QL queries provide a standardized (if convoluted) way to
  retrieve persisted FizzBuzz results.
- Positive: Transaction-scoped dirty tracking ensures predictable flush
  semantics.
- Negative: Value resolution now potentially triggers entity bean
  lifecycle operations (ejbLoad/ejbStore) even for in-memory operations.
- Negative: The EJB-QL parser adds yet another layer of indirection before
  reaching the underlying Map lookup.
- Risk: Entity bean passivation without a distributed cache may lose
  dirty state on passivation boundaries.
