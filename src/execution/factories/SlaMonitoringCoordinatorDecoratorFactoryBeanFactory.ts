import { SloThresholdBasedExecutionSlaMetricsCollectorImpl } from "../impl/metrics/SloThresholdBasedExecutionSlaMetricsCollectorImpl.js";
import { SlaMonitoringExecutionCoordinatorDecoratorImpl } from "../impl/decorators/SlaMonitoringExecutionCoordinatorDecoratorImpl.js";
import type { IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator } from "../contracts/index.js";
import type { IExecutionSlaMetricsCollector } from "../contracts/index.js";

export class SlaMonitoringCoordinatorDecoratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "SlaMonitoringCoordinatorDecoratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-SLA-MONITORING-DECORATOR-FACTORY";

  private static slaMetricsSingleton: IExecutionSlaMetricsCollector | null = null;

  static createDecorator(
    wrappedCoordinator: IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator,
    sloThresholdMs?: number,
  ): SlaMonitoringExecutionCoordinatorDecoratorImpl {
    const metrics = SlaMonitoringCoordinatorDecoratorFactoryBeanFactory.getOrCreateMetricsCollector(
      sloThresholdMs ?? 200,
    );
    return new SlaMonitoringExecutionCoordinatorDecoratorImpl(wrappedCoordinator, metrics);
  }

  static getOrCreateMetricsCollector(sloThresholdMs: number = 200): IExecutionSlaMetricsCollector {
    if (SlaMonitoringCoordinatorDecoratorFactoryBeanFactory.slaMetricsSingleton === null) {
      SlaMonitoringCoordinatorDecoratorFactoryBeanFactory.slaMetricsSingleton =
        new SloThresholdBasedExecutionSlaMetricsCollectorImpl(sloThresholdMs);
    }
    return SlaMonitoringCoordinatorDecoratorFactoryBeanFactory.slaMetricsSingleton;
  }

  static getMetricsCollector(): IExecutionSlaMetricsCollector | null {
    return SlaMonitoringCoordinatorDecoratorFactoryBeanFactory.slaMetricsSingleton;
  }

  static getFactoryBeanName(): string {
    return SlaMonitoringCoordinatorDecoratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return SlaMonitoringCoordinatorDecoratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static resetFactoryBean(): void {
    SlaMonitoringCoordinatorDecoratorFactoryBeanFactory.slaMetricsSingleton = null;
  }
}
