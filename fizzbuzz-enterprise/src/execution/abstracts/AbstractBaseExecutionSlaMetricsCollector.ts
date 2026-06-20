import type { IExecutionSlaMetricsCollector } from "../contracts/index.js";

export abstract class AbstractBaseExecutionSlaMetricsCollector
  implements IExecutionSlaMetricsCollector
{
  private static readonly METRICS_FRAMEWORK_VERSION = "1.0.0-EXECUTION-SLA-METRICS-FRAMEWORK";
  private static readonly DEFAULT_SLO_THRESHOLD_MS = 200;

  abstract recordExecutionDuration(durationMs: number): void;
  abstract recordExecutionTimeout(): void;
  abstract recordExecutionFailure(): void;
  abstract recordExecutionSuccess(): void;
  abstract getTotalExecutionCount(): number;
  abstract getTotalFailureCount(): number;
  abstract getTotalTimeoutCount(): number;
  abstract getAverageExecutionDurationMs(): number;
  abstract getMetricsCollectorName(): string;
  abstract getMetricsCollectorVersion(): string;
  abstract resetMetrics(): void;

  getSloThresholdMs(): number {
    return AbstractBaseExecutionSlaMetricsCollector.DEFAULT_SLO_THRESHOLD_MS;
  }

  isSloBreached(): boolean {
    return this.getAverageExecutionDurationMs() > this.getSloThresholdMs();
  }

  protected getMetricsFrameworkVersion(): string {
    return AbstractBaseExecutionSlaMetricsCollector.METRICS_FRAMEWORK_VERSION;
  }
}
