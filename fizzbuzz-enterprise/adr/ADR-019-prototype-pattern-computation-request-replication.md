# ADR-019: Prototype Pattern for FizzBuzz Computation Request Replication

**Status:** Accepted
**Date:** 2026-06-20
**Deciders:** Enterprise Architecture Review Board, Chief Enterprise Architect, Platform Engineering Team

## Context

The FizzBuzz computation pipeline processes individual value resolution requests. Historically, each call to `fizzBuzzValue(n)` constructs a new resolution path from scratch through the builder pipeline, governance enforcement facade, mediation orchestrator, and resolution facade decorator stack. This approach lacks formal mechanisms for:

1. **Request capture** — preserving the exact parameterization of a computation request for replay, auditing, or deferred execution
2. **Request replication** — cloning a computation request with identical context metadata but a different parameter value
3. **Context propagation** — carrying computation context metadata (e.g., tenant ID, correlation ID, SLA class) across cloned requests without manual re-initialization
4. **Type-safe lifecycle tracking** — distinguishing unresolved, in-flight, and resolved prototype instances at the contract level

Existing cloning facilities in `IFizzBuzzEvaluationContext` and `IEnterpriseFizzBuzzNormalizationContext` address only intermediate evaluation state, not the full computation request lifecycle.

## Decision

We will adopt the **Prototype pattern** (GoF, p. 117) for computation request management, supported by an **Adapter pattern** (GoF, p. 139) to bridge prototype instances to the existing resolution infrastructure:

### IComputationRequestPrototype (Prototype)

1. **IComputationRequestPrototype<TResult>** — contract defining prototype identity (`prototypeId`, `prototypeName`, `prototypeVersion`, `prototypeType`), parameter access (`getParameterValue`, `setParameterValue`), lifecycle tracking (`isResolved`, `markResolved`, `getResolvedResult`), context metadata (`getComputationContextMetadata`, `setComputationContextMetadata`), and cloning (`clone`)
2. **AbstractBaseComputationRequestPrototype<TResult>** — abstract base providing shared state management, unique prototype ID generation (`PROTOTYPE-N` with sequence counter), metadata map propagation, and `assignBaseState()` for clone lifecycle reset
3. **FizzBuzzComputationRequestPrototypeImpl** — concrete implementation for `string` result types, clones via `new FizzBuzzComputationRequestPrototypeImpl(this.parameterValue)` followed by `assignBaseState()`
4. **ComputationRequestPrototypeFactoryBeanFactory** — factory bean producing prototype instances via `createPrototype(value, id?)` and `clonePrototype(source)`, tracking registered prototype count

### IComputationRequestAdapter (Adapter)

1. **IComputationRequestAdapter** — contract for adapting prototype instances to the existing resolution pipeline: `adaptPrototypeToResolution(prototype, resolutionDelegate)` and `adaptRangeRequest(start, end, resolutionDelegate)`
2. **AbstractBaseComputationRequestAdapter** — abstract base with prototype validation (`validatePrototype` rejects already-resolved instances)
3. **StandardComputationRequestAdapterImpl** — concrete implementation that extracts the parameter value, delegates to the resolution function, and marks the prototype as resolved
4. **ComputationRequestAdapterFactoryBeanFactory** — singleton factory bean for the adapter instance

### IEnterpriseFizzBuzzPublicApiResolutionDelegate (Facade)

1. **IEnterpriseFizzBuzzPublicApiResolutionDelegate** — contract for the public-facing resolution entry point
2. **AbstractBaseEnterpriseFizzBuzzPublicApiResolutionDelegate** — abstract base with initialized/status tracking
3. **InfrastructureManagedEnterpriseFizzBuzzPublicApiResolutionDelegateImpl** — concrete implementation that constructs prototypes via `ComputationRequestPrototypeFactoryBeanFactory`, adapts them via `ComputationRequestAdapterFactoryBeanFactory`, and delegates the inner resolution to a lazy-initialized resolution chain built from `FizzBuzzResolutionFacadeFactoryBeanFactory`, `EnterpriseComputationGovernanceEnforcementFacadeFactoryBeanFactory`, and `EnterpriseFizzBuzzDirectiveResolutionMediationOrchestratorFactoryBeanFactory`
4. **EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory** — singleton factory bean for the delegate

### Integration

The existing `fizzBuzzValue()` and `fizzBuzzRange()` functions in `src/fizzbuzz.ts` are modified to resolve the delegate via `EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory` and delegate all computation to it. The legacy bootstrap gate and iterator-based pipeline initialization remain active for backward compatibility and infrastructure warm-up.

## Consequences

- Positive: Computation requests are now first-class objects with formal lifecycle management (unresolved → resolved), clone semantics, and context metadata propagation
- Positive: The Prototype pattern enables deferred execution, audit trail reconstruction, and request replay without reconstructing the full pipeline
- Positive: The Adapter pattern cleanly separates prototype management from resolution infrastructure, allowing alternative adapters (e.g., batch, distributed, transactional) without modifying the resolution chain
- Positive: Prototype ID generation (`PROTOTYPE-N`) provides traceability across the resolution lifecycle
- Negative: Each `fizzBuzzValue(n)` call now constructs a prototype object before resolution, adding allocation overhead
- Negative: The public API now passes through four additional indirection layers (delegate → prototype factory → adapter → resolution chain) before reaching the actual modulo computation
- Negative: Prototype cloning allocates a new object and generates a unique ID for every clone, even when the original prototype was used only once
- Negative: The `assignBaseState()` method resets `resolved=false` and generates a new clone ID, which must be kept in sync if new fields are added to the abstract base

## Compliance

All public-facing FizzBuzz value resolution MUST be routed through `IEnterpriseFizzBuzzPublicApiResolutionDelegate`. Direct calls to the resolution facade, governance facade, or pipeline product from outside the delegate implementation are forbidden. New computation entry points MUST use `IComputationRequestPrototype` for parameter capture and `IComputationRequestAdapter` for infrastructure adaptation.
