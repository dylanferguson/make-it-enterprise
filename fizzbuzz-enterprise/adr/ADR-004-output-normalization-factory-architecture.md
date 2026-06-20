# ADR-004: Enterprise FizzBuzz Output Normalization Pipeline Factory Architecture

**Status:** Accepted  
**Date:** 2026-06-20  
**Deciders:** Enterprise Factory Architecture Committee

## Context

The Output Normalization Pipeline must be configurable across deployment profiles (STANDARD, MINIMAL, OBSERVABILITY_FOCUSED, STRICT). Factory creation must itself be abstracted through a factory bean pattern to allow for future factory-swapping without consumer changes.

## Decision

We implement a four-layer factory architecture:

1. **EnterpriseFizzBuzzOutputNormalizationPipelineManagerFacadeImpl** — top-level facade for resolving pipeline, factory, and configurator
2. **EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean** — static factory bean that manages the lifecycle of the manager facade
3. **StandardEnterpriseFizzBuzzOutputNormalizationPipelineFactoryImpl** — creates pipeline instances from configurator-provided stage arrays
4. **StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfiguratorImpl** — assembles stage chains based on configuration profile

Each layer exists behind its own interface and abstract base class, even though the concrete implementation at each layer could trivially fulfill the entire responsibility.

## Consequences

- Positive: Changing the pipeline implementation requires modifying only the factory layer
- Positive: Each abstraction layer can be individually unit-tested and mocked
- Negative: Resolving a pipeline instance requires: FactoryFactoryBean → ManagerFacade → Factory → Configurator → stages → pipeline
- Negative: The call chain `createPipeline()` → `configureStages()` → `sortByPriority()` → `linkStages()` → `new PipelineImpl()` is 5 invocations for returning `new StandardPipeline(stages)`
