import type {
  ISlaMonitoringExecutionCoordinatorDecorator,
  IExecutionSlaMetricsCollector,
  ICircuitBreakerStateSnapshot,
  IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator,
} from "../contracts/index.js";

export abstract class AbstractBaseSlaMonitoringExecutionCoordinatorDecorator
  implements ISlaMonitoringExecutionCoordinatorDecorator
{
  private static readonly DECORATOR_FRAMEWORK_VERSION = "1.0.0-SLA-MONITORING-DECORATOR-FRAMEWORK";

  protected readonly wrappedCoordinator: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator;
  protected readonly slaMetricsCollector: IExecutionSlaMetricsCollector;

  constructor(
    wrappedCoordinator: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator,
    slaMetricsCollector: IExecutionSlaMetricsCollector,
  ) {
    this.wrappedCoordinator = wrappedCoordinator;
    this.slaMetricsCollector = slaMetricsCollector;
  }

  abstract coordinateSingleValueExecution(value: number): string;
  abstract getCoordinatorName(): string;
  abstract getCoordinatorVersion(): string;
  abstract getRegisteredExecutionStrategies(): readonly string[];
  abstract getCircuitBreakerStateSnapshot(): ICircuitBreakerStateSnapshot;

  getWrappedCoordinator(): IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator {
    return this.wrappedCoordinator;
  }

  getSlaMetricsCollector(): IExecutionSlaMetricsCollector {
    return this.slaMetricsCollector;
  }

  protected getDecoratorFrameworkVersion(): string {
    return AbstractBaseSlaMonitoringExecutionCoordinatorDecorator.DECORATOR_FRAMEWORK_VERSION;
  }
}
