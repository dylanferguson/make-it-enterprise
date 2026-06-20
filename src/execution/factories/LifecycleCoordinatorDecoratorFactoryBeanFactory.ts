import { StateMachineBasedExecutionLifecycleContextImpl } from "../impl/lifecycle/StateMachineBasedExecutionLifecycleContextImpl.js";
import { LifecycleManagedExecutionCoordinatorDecoratorImpl } from "../impl/decorators/LifecycleManagedExecutionCoordinatorDecoratorImpl.js";
import type { IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator } from "../contracts/index.js";
import type { IExecutionLifecycleContext } from "../contracts/index.js";

export class LifecycleCoordinatorDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "LifecycleCoordinatorDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-LIFECYCLE-DECORATOR-FACTORY";

  private static lifecycleContextSingleton: IExecutionLifecycleContext | null = null;

  static createDecorator(
    wrappedCoordinator: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator,
  ): LifecycleManagedExecutionCoordinatorDecoratorImpl {
    const context = LifecycleCoordinatorDecoratorFactoryBeanFactory.getOrCreateLifecycleContext();
    return new LifecycleManagedExecutionCoordinatorDecoratorImpl(wrappedCoordinator, context);
  }

  static getOrCreateLifecycleContext(): IExecutionLifecycleContext {
    if (LifecycleCoordinatorDecoratorFactoryBeanFactory.lifecycleContextSingleton === null) {
      LifecycleCoordinatorDecoratorFactoryBeanFactory.lifecycleContextSingleton =
        new StateMachineBasedExecutionLifecycleContextImpl();
    }
    return LifecycleCoordinatorDecoratorFactoryBeanFactory.lifecycleContextSingleton;
  }

  static getLifecycleContext(): IExecutionLifecycleContext | null {
    return LifecycleCoordinatorDecoratorFactoryBeanFactory.lifecycleContextSingleton;
  }

  static getFactoryBeanName(): string {
    return LifecycleCoordinatorDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return LifecycleCoordinatorDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetFactoryBean(): void {
    LifecycleCoordinatorDecoratorFactoryBeanFactory.lifecycleContextSingleton = null;
  }
}
