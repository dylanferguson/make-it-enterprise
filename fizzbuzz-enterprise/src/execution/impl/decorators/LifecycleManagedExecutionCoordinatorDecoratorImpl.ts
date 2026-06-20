import { AbstractBaseLifecycleManagedExecutionCoordinatorDecorator } from "../../abstracts/AbstractBaseLifecycleManagedExecutionCoordinatorDecorator.js";
import type { IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator } from "../../contracts/index.js";
import type { IExecutionLifecycleContext } from "../../contracts/index.js";
import type { ICircuitBreakerStateSnapshot } from "../../contracts/index.js";

export class LifecycleManagedExecutionCoordinatorDecoratorImpl
  extends AbstractBaseLifecycleManagedExecutionCoordinatorDecorator
{
  private static readonly DECORATOR_NAME = "LifecycleManagedExecutionCoordinatorDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-LIFECYCLE-MANAGED-DECORATOR";

  constructor(
    wrappedCoordinator: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator,
    lifecycleContext: IExecutionLifecycleContext,
  ) {
    super(wrappedCoordinator, lifecycleContext);
  }

  override coordinateSingleValueExecution(value: number): string {
    this.lifecycleContext.transitionToPhase("STRATEGY_SELECTION");
    this.lifecycleContext.transitionToPhase("CIRCUIT_BREAKER_EVALUATION");
    this.lifecycleContext.transitionToPhase("EXECUTION_RESOLVING");
    try {
      const result = this.wrappedCoordinator.coordinateSingleValueExecution(value);
      this.lifecycleContext.transitionToPhase("SLA_VALIDATION");
      this.lifecycleContext.transitionToPhase("COMPLETED");
      return result;
    } catch (error) {
      this.lifecycleContext.transitionToPhase("FAILED");
      throw error;
    }
  }

  override getCoordinatorName(): string {
    return `${LifecycleManagedExecutionCoordinatorDecoratorImpl.DECORATOR_NAME}::${this.wrappedCoordinator.getCoordinatorName()}`;
  }

  override getCoordinatorVersion(): string {
    return LifecycleManagedExecutionCoordinatorDecoratorImpl.DECORATOR_VERSION;
  }

  override getRegisteredExecutionStrategies(): readonly string[] {
    return this.wrappedCoordinator.getRegisteredExecutionStrategies();
  }

  override getCircuitBreakerStateSnapshot(): ICircuitBreakerStateSnapshot {
    return this.wrappedCoordinator.getCircuitBreakerStateSnapshot();
  }
}
