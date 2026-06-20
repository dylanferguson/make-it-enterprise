import type { IFizzBuzzManagementMBean } from "../contracts/IFizzBuzzManagementMBean.js";
import type { HealthStatus } from "../contracts/IHealthIndicator.js";

export abstract class AbstractBaseFizzBuzzManagementMBean implements IFizzBuzzManagementMBean {
  protected totalValuesResolved: number = 0;
  protected readonly mbeanName: string;
  protected readonly mbeanType: string;

  constructor(mbeanName: string = "FizzBuzz:type=FizzBuzzManagementMBean", mbeanType: string = "FizzBuzzManagementMBean") {
    this.mbeanName = mbeanName;
    this.mbeanType = mbeanType;
  }

  abstract getMBeanName(): string;
  abstract getMBeanType(): string;
  abstract getApplicationName(): string;
  abstract getApplicationVersion(): string;
  abstract getHealthStatus(): HealthStatus;
  abstract getTotalValuesResolved(): number;
  abstract resetMBeanMetrics(): void;
  abstract isFizzBuzzOperational(): boolean;

  incrementResolvedCount(): void {
    this.totalValuesResolved++;
  }
}
