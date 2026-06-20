import type { HealthStatus } from "./IHealthIndicator.js";

export interface IFizzBuzzManagementMBean {
  getMBeanName(): string;
  getMBeanType(): string;
  getApplicationName(): string;
  getApplicationVersion(): string;
  getHealthStatus(): HealthStatus;
  getTotalValuesResolved(): number;
  resetMBeanMetrics(): void;
  isFizzBuzzOperational(): boolean;
  incrementResolvedCount(): void;
}
