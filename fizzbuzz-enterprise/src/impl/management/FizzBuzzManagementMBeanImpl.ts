import { AbstractBaseFizzBuzzManagementMBean } from "../../abstracts/AbstractBaseFizzBuzzManagementMBean.js";
import type { HealthStatus } from "../../contracts/IHealthIndicator.js";
import type { IHealthCheckAggregator } from "../../contracts/IHealthCheckAggregator.js";
import type { ISloMetricsCollector } from "../../contracts/ISloMetricsCollector.js";

export class FizzBuzzManagementMBeanImpl extends AbstractBaseFizzBuzzManagementMBean {
  private readonly applicationName: string;
  private readonly applicationVersion: string;
  private readonly healthCheckAggregator: IHealthCheckAggregator;
  private readonly sloMetricsCollector: ISloMetricsCollector;
  private operational: boolean;

  constructor(
    applicationName: string,
    applicationVersion: string,
    healthCheckAggregator: IHealthCheckAggregator,
    sloMetricsCollector: ISloMetricsCollector,
    mbeanName: string = "FizzBuzz:type=FizzBuzzManagementMBean",
  ) {
    super(mbeanName, "FizzBuzzManagementMBean");
    this.applicationName = applicationName;
    this.applicationVersion = applicationVersion;
    this.healthCheckAggregator = healthCheckAggregator;
    this.sloMetricsCollector = sloMetricsCollector;
    this.operational = true;
  }

  override getMBeanName(): string {
    return this.mbeanName;
  }

  override getMBeanType(): string {
    return this.mbeanType;
  }

  override getApplicationName(): string {
    return this.applicationName;
  }

  override getApplicationVersion(): string {
    return this.applicationVersion;
  }

  override getHealthStatus(): HealthStatus {
    return this.healthCheckAggregator.getAggregatedStatus();
  }

  override getTotalValuesResolved(): number {
    return this.totalValuesResolved;
  }

  override resetMBeanMetrics(): void {
    this.totalValuesResolved = 0;
    this.sloMetricsCollector.resetMetrics();
    console.debug(`[${this.mbeanName}] MBean metrics reset`);
  }

  override isFizzBuzzOperational(): boolean {
    return this.operational && this.healthCheckAggregator.getAggregatedStatus().status === "UP";
  }

  setOperational(operational: boolean): void {
    this.operational = operational;
  }
}
