import type {
  ICircuitBreakerAwareExecutionCoordinatorDecorator,
  ICircuitBreakerConfigurationProvider,
  ICircuitBreakerStateSnapshot,
  IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator,
} from "../contracts/index.js";

export abstract class AbstractBaseCircuitBreakerAwareExecutionCoordinatorDecorator
  implements ICircuitBreakerAwareExecutionCoordinatorDecorator
{
  private static readonly DECORATOR_FRAMEWORK_VERSION = "1.0.0-CIRCUIT-BREAKER-DECORATOR-FRAMEWORK";

  protected readonly wrappedCoordinator: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator;
  protected readonly circuitBreakerConfig: ICircuitBreakerConfigurationProvider;

  constructor(
    wrappedCoordinator: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator,
    circuitBreakerConfig: ICircuitBreakerConfigurationProvider,
  ) {
    this.wrappedCoordinator = wrappedCoordinator;
    this.circuitBreakerConfig = circuitBreakerConfig;
  }

  abstract coordinateSingleValueExecution(value: number): string;
  abstract getCoordinatorName(): string;
  abstract getCoordinatorVersion(): string;
  abstract getRegisteredExecutionStrategies(): readonly string[];
  abstract isCircuitBreakerEngaged(): boolean;
  abstract getCircuitBreakerStateSnapshot(): ICircuitBreakerStateSnapshot;

  getWrappedCoordinator(): IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator {
    return this.wrappedCoordinator;
  }

  getCircuitBreakerConfiguration(): ICircuitBreakerConfigurationProvider {
    return this.circuitBreakerConfig;
  }

  protected getDecoratorFrameworkVersion(): string {
    return AbstractBaseCircuitBreakerAwareExecutionCoordinatorDecorator.DECORATOR_FRAMEWORK_VERSION;
  }
}
