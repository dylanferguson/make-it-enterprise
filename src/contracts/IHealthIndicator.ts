export interface IHealthIndicator {
  getName(): string;
  getHealthStatus(): HealthStatus;
  getHealthDetails(): Record<string, unknown>;
  isHealthy(): boolean;
  getLastCheckedTimestamp(): Date | null;
}

export interface HealthStatus {
  readonly status: "UP" | "DOWN" | "DEGRADED" | "UNKNOWN";
  readonly componentName: string;
  readonly message: string;
  readonly timestamp: Date;
}
