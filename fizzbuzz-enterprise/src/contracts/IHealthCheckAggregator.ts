import type { IHealthIndicator, HealthStatus } from "./IHealthIndicator.js";

export interface IHealthCheckAggregator {
  registerIndicator(indicator: IHealthIndicator): void;
  unregisterIndicator(name: string): boolean;
  getAggregatedStatus(): HealthStatus;
  getAllIndicators(): readonly IHealthIndicator[];
  getIndicator(name: string): IHealthIndicator | null;
  isSystemHealthy(): boolean;
  getUnhealthyComponents(): string[];
}
