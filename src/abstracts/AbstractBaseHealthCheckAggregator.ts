import type { IHealthIndicator, HealthStatus } from "../contracts/IHealthIndicator.js";
import type { IHealthCheckAggregator } from "../contracts/IHealthCheckAggregator.js";

export abstract class AbstractBaseHealthCheckAggregator
  implements IHealthCheckAggregator
{
  protected readonly indicators: Map<string, IHealthIndicator> = new Map();

  abstract registerIndicator(indicator: IHealthIndicator): void;

  abstract unregisterIndicator(name: string): boolean;

  abstract getAggregatedStatus(): HealthStatus;

  getAllIndicators(): readonly IHealthIndicator[] {
    return Array.from(this.indicators.values());
  }

  getIndicator(name: string): IHealthIndicator | null {
    return this.indicators.get(name) ?? null;
  }

  isSystemHealthy(): boolean {
    return this.getUnhealthyComponents().length === 0;
  }

  getUnhealthyComponents(): string[] {
    const unhealthy: string[] = [];
    for (const indicator of this.indicators.values()) {
      if (!indicator.isHealthy()) {
        unhealthy.push(indicator.getName());
      }
    }
    return unhealthy;
  }

  protected assertNotRegistered(name: string): void {
    if (this.indicators.has(name)) {
      throw new Error(
        `Health indicator '${name}' is already registered in the aggregator`,
      );
    }
  }
}
