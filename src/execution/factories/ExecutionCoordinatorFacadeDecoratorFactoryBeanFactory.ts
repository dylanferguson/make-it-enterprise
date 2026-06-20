import { SloThresholdBasedExecutionSlaMetricsCollectorImpl } from "../impl/metrics/SloThresholdBasedExecutionSlaMetricsCollectorImpl.js";
import { SlaMonitoringExecutionCoordinatorDecoratorImpl } from "../impl/decorators/SlaMonitoringExecutionCoordinatorDecoratorImpl.js";
import { CircuitBreakerManagedExecutionCoordinatorDecoratorImpl } from "../impl/decorators/CircuitBreakerManagedExecutionCoordinatorDecoratorImpl.js";
import { LifecycleManagedExecutionCoordinatorDecoratorImpl } from "../impl/decorators/LifecycleManagedExecutionCoordinatorDecoratorImpl.js";
import { DefaultExecutionCoordinatorAwareResolutionFacadeDecoratorImpl } from "../impl/decorators/DefaultExecutionCoordinatorAwareResolutionFacadeDecoratorImpl.js";
import { EnterpriseExecutionCoordinatorFactoryBeanFactory } from "./EnterpriseExecutionCoordinatorFactoryBeanFactory.js";
import { CircuitBreakerCoordinatorDecoratorFactoryBeanFactory } from "./CircuitBreakerCoordinatorDecoratorFactoryBeanFactory.js";
import { SlaMonitoringCoordinatorDecoratorFactoryBeanFactory } from "./SlaMonitoringCoordinatorDecoratorFactoryBeanFactory.js";
import { LifecycleCoordinatorDecoratorFactoryBeanFactory } from "./LifecycleCoordinatorDecoratorFactoryBeanFactory.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IExecutionCoordinatorAwareResolutionFacadeDecorator } from "../contracts/IExecutionCoordinatorAwareResolutionFacadeDecorator.js";
import type { IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator } from "../contracts/index.js";

export class ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FACADE-DECORATOR-FACTORY";

  private static facadeDecoratorSingleton: IExecutionCoordinatorAwareResolutionFacadeDecorator | null = null;
  private static fullyDecoratedCoordinatorSingleton: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator | null = null;
  private static initialized = false;

  static createCoordinatorAwareFacadeDecorator(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    fullyDecorated: boolean = true,
    sloThresholdMs: number = 200,
  ): IExecutionCoordinatorAwareResolutionFacadeDecorator {
    if (ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.initialized && fullyDecorated) {
      return ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.facadeDecoratorSingleton!;
    }

    let coordinator = EnterpriseExecutionCoordinatorFactoryBeanFactory.createCoordinator(
      (v: number) => wrappedFacade.resolveValue(v),
    );

    if (fullyDecorated) {
      const slaDecorator = SlaMonitoringCoordinatorDecoratorFactoryBeanFactory.createDecorator(
        coordinator,
        sloThresholdMs,
      );

      const lifecycleDecorator = LifecycleCoordinatorDecoratorFactoryBeanFactory.createDecorator(
        slaDecorator,
      );

      const circuitBreakerDecorator = CircuitBreakerCoordinatorDecoratorFactoryBeanFactory.createDecorator(
        lifecycleDecorator,
      );

      ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.fullyDecoratedCoordinatorSingleton =
        circuitBreakerDecorator;

      const facadeDecorator = new DefaultExecutionCoordinatorAwareResolutionFacadeDecoratorImpl(
        wrappedFacade,
        circuitBreakerDecorator,
      );

      ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.facadeDecoratorSingleton = facadeDecorator;
      ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.initialized = true;

      const state = circuitBreakerDecorator.getCircuitBreakerStateSnapshot();
      console.debug(
        `[${ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME} v${ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION}] ` +
        `Fully decorated execution coordinator facade created: ` +
        `coordinator=[${coordinator.getCoordinatorName()} v${coordinator.getCoordinatorVersion()}], ` +
        `slaDecorator=[${slaDecorator.getCoordinatorName()}], ` +
        `lifecycleDecorator=[${lifecycleDecorator.getCoordinatorName()}], ` +
        `circuitBreakerDecorator=[${circuitBreakerDecorator.getCoordinatorName()}], ` +
        `cbState=[${state.stateName}], ` +
        `failureThreshold=[${state.failureThreshold}], ` +
        `successThreshold=[${state.successThreshold}], ` +
        `strategies=[${coordinator.getRegisteredExecutionStrategies().join(", ")}]`,
      );

      return facadeDecorator;
    }

    const facadeDecorator = new DefaultExecutionCoordinatorAwareResolutionFacadeDecoratorImpl(
      wrappedFacade,
      coordinator,
    );
    return facadeDecorator;
  }

  static getFacadeDecorator(): IExecutionCoordinatorAwareResolutionFacadeDecorator | null {
    return ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.facadeDecoratorSingleton;
  }

  static getFullyDecoratedCoordinator(): IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator | null {
    return ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.fullyDecoratedCoordinatorSingleton;
  }

  static isInitialized(): boolean {
    return ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.initialized;
  }

  static getFactoryBeanName(): string {
    return ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetFactoryBean(): void {
    ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.facadeDecoratorSingleton = null;
    ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.fullyDecoratedCoordinatorSingleton = null;
    ExecutionCoordinatorFacadeDecoratorFactoryBeanFactory.initialized = false;
  }
}
