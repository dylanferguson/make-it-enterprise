# FizzBuzz Enterprise

This is what happened when a clean, 21-line FizzBuzz implementation was told
to become "more enterprise-grade" 100 times in succession.

The starting project exposed two functions, `fizzBuzzValue` and
`fizzBuzzRange`, backed by the usual `% 3` and `% 5` checks. Each run gave an AI
agent the same instruction: perform one coherent enterprise transformation,
preserve observable behaviour, keep the tests passing, and build on everything
the previous runs had added.

The prompt specifically encouraged early-2000s Java enterprise architecture:
interfaces for every concept, abstract base classes, concrete implementations,
factories that produce factories, strategy selectors, service locators, and
Gang of Four patterns applied because they exist rather than because they fit.

## The result

| Metric | Seed | After 100 runs |
| --- | ---: | ---: |
| Tracked files | 11 | 1,915 |
| TypeScript/TSX files | 3 | 1,803 |
| TypeScript/TSX lines | 74 | 74,581 |
| Lines in `src/fizzbuzz.ts` | 21 | 2,154 |
| Source directories | 1 | 496 |
| Test files | 1 | 1 |
| Test lines | 48 | 48 |
| Architecture decision records | 0 | 52 |
| CI workflows | 0 | 5 |
| Kubernetes manifests | 0 | 27 |
| XML deployment descriptors | 0 | 14 |

The TypeScript code grew by roughly 1,000 times. The test suite did not grow at
all. Its original five tests still describe the complete externally observable
contract.

## What it became

The two original exports still exist, but they now enter through a computation
lifecycle orchestrator, create commands, cross a public API session facade,
activate a service endpoint, dispatch into a pipeline manager selected by a
resolution strategy, and eventually reach a remainder computation strategy.

Along the way, the project accumulated:

- Command, Visitor, Strategy, Chain of Responsibility, Template Method,
  Decorator, Bridge, Flyweight, Prototype, Memento, Mediator, Proxy, Builder,
  Factory, and Service Locator implementations
- application contexts, governance policies, audit trails, state machines,
  circuit breakers, caches, registries, interceptors, and lifecycle managers
- TypeScript interpretations of EJB, JMS, JNDI, JMX, JAAS, RMI, CORBA,
  distributed transactions, batch jobs, and deployment descriptors
- Kubernetes resources, SLOs, Prometheus rules, five CI workflows, and a React
  metrics dashboard

### Selected specimens

Some identifiers deserve to be preserved in full:

- `EnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecoratorFactoryBeanFactory`
  — a 93-character factory-bean factory for a facade decorator around an
  interceptor adapter
- `EnterpriseFizzBuzzResolutionDelegationOrchestratorFactoryBeanFactoryFactoryFactory`
  — the project did eventually progress from factories to factory factories to
  a factory factory factory
- `PriorityBasedEnterpriseFizzBuzzDirectiveResolutionMediationStrategySelectorStrategyImpl`
  — a strategy implementation for selecting a strategy selector strategy
- `ComputationResolutionMediatorArchitectureAwareResolutionFacadeDecoratorFactoryBeanFactory`
  — architecture awareness, mediation, resolution, decoration, and factory
  production in one identifier
- `ServiceLocatorManagedModularArithmeticDivisibilityResolutionMediatorProviderImpl`
  — the provider behind finding something that can determine divisibility
- `AbstractBaseEnterpriseFizzBuzzTemplateMethodResolutionChainHandlerDecorator`
  — both an abstract base and a decorator for a template-method chain handler
- `EnterpriseFizzBuzzDivisibilityDelegationBackedOutputResolutionNormalizationStageImpl`
  — a normalization stage backed by delegated divisibility output resolution
- `DivisibleByEnterpriseFacadeDelegatingFizzBuzzOutputStringResolutionStrategyImpl`
  — one of several strategies devoted to deciding that the output should be
  `FizzBuzz`

The actual arithmetic survives near the bottom of the stack. For example,
`NativeJavaScriptModuloRemainderComputationCommandImpl` still contains a plain
`value % divisor`; it simply takes considerably more architecture to reach it.

The entry point also grew a startup ceremony. Before printing 1 through 100 it
initializes a service locator, bootstrap initializer, deployment-descriptor
decorator, and enterprise application context. It installs graceful-shutdown
handlers when it is done.

## Did it still work?

Yes. In the exported result, all five original tests pass, both TypeScript
projects type-check, and the production build completes.

```sh
pnpm install
pnpm test
pnpm typecheck
pnpm build
pnpm start
```

The public behaviour remains FizzBuzz. Almost everything else is ceremony.

## About the history

The repository retains the full experiment history: one clean seed commit
followed by 100 agent-run commits. Ninety-nine runs completed and verified; one
initial run failed without changing the seed. The visible iteration numbers
restart because the loop was launched in three sessions, but the Git history is
continuous.

All runs used `opencode/deepseek-v4-flash`. The exact instruction is preserved
in [`prompts/make-it-enterprise.txt`](prompts/make-it-enterprise.txt).
