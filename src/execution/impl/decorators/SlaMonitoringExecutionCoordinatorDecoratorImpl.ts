import { AbstractBaseSlaMonitoringExecutionCoordinatorDecorator } from "../../abstracts/AbstractBaseSlaMonitoringExecutionCoordinatorDecorator.js";
import type { IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator } from "../../contracts/index.js";
import type { IExecutionSlaMetricsCollector } from "../../contracts/index.js";
import type { ICircuitBreakerStateSnapshot } from "../../contracts/index.js";

export class SlaMonitoringExecutionCoordinatorDecoratorImpl
  extends AbstractBaseSlaMonitoringExecutionCoordinatorDecorator
{
  private static readonly DECORATOR_NAME = "SlaMonitoringExecutionCoordinatorDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-SLA-MONITORING-DECORATOR";

  constructor(
    wrappedCoordinator: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator,
    slaMetricsCollector: IExecutionSlaMetricsCollector,
  ) {
    super(wrappedCoordinator, slaMetricsCollector);
  }

  override coordinateSingleValueExecution(value: number): string {
    const startTime = performance.now();
    try {
      const result = this.wrappedCoordinator.coordinateSingleValueExecution(value);
      const durationMs = performance.now() - startTime;
      this.slaMetricsCollector.recordExecutionDuration(durationMs);
      this.slaMetricsCollector.recordExecutionSuccess();
      if (this.slaMetricsCollector.isSloBreached()) {
        console.warn(
          `[${SlaMonitoringExecutionCoordinatorDecoratorImpl.DECORATOR_NAME}] SLO threshold breached: ` +
          `avg=${this.slaMetricsCollector.getAverageExecutionDurationMs().toFixed(2)}ms > ` +
          `threshold=${this.slaMetricsCollector.getSloThresholdMs()}ms ` +
          `(total: ${this.slaMetricsCollector.getTotalExecutionCount()} executions)`,
        );
      }
      return result;
    } catch (error) {
      const durationMs = performance.now() - startTime;
      this.slaMetricsCollector.recordExecutionDuration(durationMs);
      this.slaMetricsCollector.recordExecutionFailure();
      throw error;
    }
  }

  override getCoordinatorName(): string {
    return `${SlaMonitoringExecutionCoordinatorDecoratorImpl.DECORATOR_NAME}::${this.wrappedCoordinator.getCoordinatorName()}`;
  }

  override getCoordinatorVersion(): string {
    return SlaMonitoringExecutionCoordinatorDecoratorImpl.DECORATOR_VERSION;
  }

  override getRegisteredExecutionStrategies(): readonly string[] {
    return this.wrappedCoordinator.getRegisteredExecutionStrategies();
  }

  override getCircuitBreakerStateSnapshot(): ICircuitBreakerStateSnapshot {
    return this.wrappedCoordinator.getCircuitBreakerStateSnapshot();
  }
}
