import type { IHealthIndicator, HealthStatus } from "../../contracts/IHealthIndicator.js";
import type { IHealthCheckAggregator } from "../../contracts/IHealthCheckAggregator.js";
import { AbstractBaseHealthCheckAggregator } from "../../abstracts/AbstractBaseHealthCheckAggregator.js";

export class HealthCheckAggregatorImpl extends AbstractBaseHealthCheckAggregator {
  override registerIndicator(indicator: IHealthIndicator): void {
    this.assertNotRegistered(indicator.getName());
    this.indicators.set(indicator.getName(), indicator);
  }

  override unregisterIndicator(name: string): boolean {
    return this.indicators.delete(name);
  }

  override getAggregatedStatus(): HealthStatus {
    const allStatuses = Array.from(this.indicators.values()).map((i) =>
      i.getHealthStatus(),
    );

    const hasDown = allStatuses.some((s) => s.status === "DOWN");
    const hasDegraded = allStatuses.some((s) => s.status === "DEGRADED");

    let aggregatedStatus: HealthStatus["status"];
    if (allStatuses.length === 0) {
      aggregatedStatus = "UNKNOWN";
    } else if (hasDown) {
      aggregatedStatus = "DOWN";
    } else if (hasDegraded) {
      aggregatedStatus = "DEGRADED";
    } else {
      aggregatedStatus = "UP";
    }

    const downComponents = allStatuses
      .filter((s) => s.status === "DOWN" || s.status === "DEGRADED")
      .map((s) => `${s.componentName}: ${s.message}`);

    return {
      status: aggregatedStatus,
      componentName: "FizzBuzzEnterpriseEdition",
      message:
        downComponents.length > 0
          ? `Degraded components: ${downComponents.join("; ")}`
          : "All components healthy",
      timestamp: new Date(),
    };
  }
}
