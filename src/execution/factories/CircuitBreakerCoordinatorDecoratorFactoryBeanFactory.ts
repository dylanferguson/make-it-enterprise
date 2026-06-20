import { InMemoryCircuitBreakerStateStoreImpl } from "../impl/circuitbreaker/InMemoryCircuitBreakerStateStoreImpl.js";
import { DefaultCircuitBreakerConfigurationProviderImpl } from "../impl/metrics/DefaultCircuitBreakerConfigurationProviderImpl.js";
import { CircuitBreakerManagedExecutionCoordinatorDecoratorImpl } from "../impl/decorators/CircuitBreakerManagedExecutionCoordinatorDecoratorImpl.js";
import type { IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator } from "../contracts/index.js";
import type { ICircuitBreakerConfigurationProvider } from "../contracts/index.js";
import type { ICircuitBreakerStateStore } from "../contracts/index.js";

export class CircuitBreakerCoordinatorDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "CircuitBreakerCoordinatorDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-CIRCUIT-BREAKER-DECORATOR-FACTORY";

  private static stateStoreSingleton: ICircuitBreakerStateStore | null = null;
  private static configSingleton: ICircuitBreakerConfigurationProvider | null = null;

  static createDecorator(
    wrappedCoordinator: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator,
  ): CircuitBreakerManagedExecutionCoordinatorDecoratorImpl {
    const config = CircuitBreakerCoordinatorDecoratorFactoryBeanFactory.getOrCreateConfiguration();
    const stateStore = CircuitBreakerCoordinatorDecoratorFactoryBeanFactory.getOrCreateStateStore();
    return new CircuitBreakerManagedExecutionCoordinatorDecoratorImpl(
      wrappedCoordinator,
      config,
      stateStore,
    );
  }

  static getOrCreateConfiguration(
    failureThreshold?: number,
    successThreshold?: number,
    timeoutMs?: number,
  ): ICircuitBreakerConfigurationProvider {
    if (CircuitBreakerCoordinatorDecoratorFactoryBeanFactory.configSingleton === null) {
      CircuitBreakerCoordinatorDecoratorFactoryBeanFactory.configSingleton =
        new DefaultCircuitBreakerConfigurationProviderImpl(
          failureThreshold ?? 5,
          successThreshold ?? 2,
          timeoutMs ?? 10000,
        );
    }
    return CircuitBreakerCoordinatorDecoratorFactoryBeanFactory.configSingleton;
  }

  static getOrCreateStateStore(): ICircuitBreakerStateStore {
    if (CircuitBreakerCoordinatorDecoratorFactoryBeanFactory.stateStoreSingleton === null) {
      CircuitBreakerCoordinatorDecoratorFactoryBeanFactory.stateStoreSingleton =
        new InMemoryCircuitBreakerStateStoreImpl();
    }
    return CircuitBreakerCoordinatorDecoratorFactoryBeanFactory.stateStoreSingleton;
  }

  static getFactoryBeanName(): string {
    return CircuitBreakerCoordinatorDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return CircuitBreakerCoordinatorDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetFactoryBean(): void {
    CircuitBreakerCoordinatorDecoratorFactoryBeanFactory.stateStoreSingleton = null;
    CircuitBreakerCoordinatorDecoratorFactoryBeanFactory.configSingleton = null;
  }
}
