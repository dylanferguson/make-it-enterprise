import type { IHealthIndicator, HealthStatus } from "../contracts/IHealthIndicator.js";

export abstract class AbstractBaseHealthIndicator implements IHealthIndicator {
  private lastCheckedTimestamp: Date | null = null;

  abstract getName(): string;
  abstract getHealthStatus(): HealthStatus;
  abstract getHealthDetails(): Record<string, unknown>;

  isHealthy(): boolean {
    const status = this.getHealthStatus();
    return status.status === "UP";
  }

  getLastCheckedTimestamp(): Date | null {
    return this.lastCheckedTimestamp;
  }

  protected createHealthStatus(
    status: HealthStatus["status"],
    componentName: string,
    message: string,
  ): HealthStatus {
    const healthStatus: HealthStatus = {
      status,
      componentName,
      message,
      timestamp: new Date(),
    };
    this.lastCheckedTimestamp = healthStatus.timestamp;
    return healthStatus;
  }

  protected updateLastChecked(): void {
    this.lastCheckedTimestamp = new Date();
  }
}
