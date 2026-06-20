import type {
  ILifecycleManagedExecutionCoordinatorDecorator,
  IExecutionLifecycleContext,
  ICircuitBreakerStateSnapshot,
  IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator,
} from "../contracts/index.js";

export abstract class AbstractBaseLifecycleManagedExecutionCoordinatorDecorator
  implements ILifecycleManagedExecutionCoordinatorDecorator
{
  private static readonly DECORATOR_FRAMEWORK_VERSION = "1.0.0-LIFECYCLE-DECORATOR-FRAMEWORK";

  protected readonly wrappedCoordinator: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator;
  protected readonly lifecycleContext: IExecutionLifecycleContext;

  constructor(
    wrappedCoordinator: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator,
    lifecycleContext: IExecutionLifecycleContext,
  ) {
    this.wrappedCoordinator = wrappedCoordinator;
    this.lifecycleContext = lifecycleContext;
  }

  abstract coordinateSingleValueExecution(value: number): string;
  abstract getCoordinatorName(): string;
  abstract getCoordinatorVersion(): string;
  abstract getRegisteredExecutionStrategies(): readonly string[];
  abstract getCircuitBreakerStateSnapshot(): ICircuitBreakerStateSnapshot;

  getWrappedCoordinator(): IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator {
    return this.wrappedCoordinator;
  }

  getLifecycleContext(): IExecutionLifecycleContext {
    return this.lifecycleContext;
  }

  protected getDecoratorFrameworkVersion(): string {
    return AbstractBaseLifecycleManagedExecutionCoordinatorDecorator.DECORATOR_FRAMEWORK_VERSION;
  }
}
