import type { IModuloEvaluationStrategyProvider } from "../../contracts/IModuloEvaluationStrategyProvider.js";
import type { HealthStatus } from "../../contracts/IHealthIndicator.js";
import { AbstractBaseHealthIndicator } from "../../abstracts/AbstractBaseHealthIndicator.js";
import { ConfigurationException } from "../../exceptions/ConfigurationException.js";

export class FizzBuzzHealthIndicatorImpl extends AbstractBaseHealthIndicator {
  private static readonly INDICATOR_NAME = "FizzBuzzHealthIndicator";
  private readonly evaluationStrategyProvider: IModuloEvaluationStrategyProvider;
  private healthy: boolean = true;
  private degradationReason: string | null = null;

  constructor(evaluationStrategyProvider: IModuloEvaluationStrategyProvider) {
    super();
    this.evaluationStrategyProvider = evaluationStrategyProvider;
  }

  override getName(): string {
    return FizzBuzzHealthIndicatorImpl.INDICATOR_NAME;
  }

  override getHealthStatus(): HealthStatus {
    try {
      const defaultStrategy = this.evaluationStrategyProvider.getDefaultStrategy();
      if (defaultStrategy === null) {
        return this.createHealthStatus("DOWN", this.getName(), "No default modulo evaluation strategy configured");
      }
      const supportsThree = defaultStrategy.supportsDivisor(3);
      const supportsFive = defaultStrategy.supportsDivisor(5);
      if (!supportsThree || !supportsFive) {
        return this.createHealthStatus("DEGRADED", this.getName(), "Default strategy does not support standard FizzBuzz divisors");
      }
      const result3 = defaultStrategy.evaluateModulo(9, 3);
      const result5 = defaultStrategy.evaluateModulo(10, 5);
      if (result3 !== 0 || result5 !== 0) {
        return this.createHealthStatus("DEGRADED", this.getName(), `Modulo evaluation returned unexpected results: 9%3=${result3}, 10%5=${result5}`);
      }
      return this.createHealthStatus("UP", this.getName(), "All FizzBuzz components are operational");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return this.createHealthStatus("DOWN", this.getName(), `Health check failed: ${message}`);
    }
  }

  override getHealthDetails(): Record<string, unknown> {
    const status = this.getHealthStatus();
    return {
      componentName: this.getName(),
      status: status.status,
      message: status.message,
      checkedAt: status.timestamp.toISOString(),
      healthy: this.healthy,
      degradationReason: this.degradationReason,
      defaultStrategyName: this.evaluationStrategyProvider.getDefaultStrategy().getEvaluationStrategyName(),
      providerName: this.evaluationStrategyProvider.getProviderName(),
    };
  }

  markDegraded(reason: string): void {
    this.healthy = false;
    this.degradationReason = reason;
  }

  markHealthy(): void {
    this.healthy = true;
    this.degradationReason = null;
  }

  protected override createHealthStatus(
    status: HealthStatus["status"],
    componentName: string,
    message: string,
  ): HealthStatus {
    this.updateLastChecked();
    if (status === "DOWN" || status === "DEGRADED") {
      this.markDegraded(message);
    } else {
      this.markHealthy();
    }
    return super.createHealthStatus(status, componentName, message);
  }
}
