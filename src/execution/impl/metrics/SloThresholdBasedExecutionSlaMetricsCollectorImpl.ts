import { AbstractBaseExecutionSlaMetricsCollector } from "../../abstracts/AbstractBaseExecutionSlaMetricsCollector.js";

export class SloThresholdBasedExecutionSlaMetricsCollectorImpl
  extends AbstractBaseExecutionSlaMetricsCollector
{
  private static readonly COLLECTOR_NAME = "SloThresholdBasedExecutionSlaMetricsCollector";
  private static readonly COLLECTOR_VERSION = "1.0.0-SLA-THRESHOLD-METRICS";

  private totalExecutions: number = 0;
  private totalFailures: number = 0;
  private totalTimeouts: number = 0;
  private totalDurationMs: number = 0;
  private readonly sloThresholdMs: number;

  constructor(sloThresholdMs: number = 200) {
    super();
    this.sloThresholdMs = sloThresholdMs;
  }

  override recordExecutionDuration(durationMs: number): void {
    this.totalExecutions++;
    this.totalDurationMs += durationMs;
  }

  override recordExecutionTimeout(): void {
    this.totalTimeouts++;
    this.totalExecutions++;
  }

  override recordExecutionFailure(): void {
    this.totalFailures++;
    this.totalExecutions++;
  }

  override recordExecutionSuccess(): void {
    this.totalExecutions++;
  }

  override getTotalExecutionCount(): number {
    return this.totalExecutions;
  }

  override getTotalFailureCount(): number {
    return this.totalFailures;
  }

  override getTotalTimeoutCount(): number {
    return this.totalTimeouts;
  }

  override getAverageExecutionDurationMs(): number {
    if (this.totalExecutions === 0) return 0;
    return this.totalDurationMs / this.totalExecutions;
  }

  override getMetricsCollectorName(): string {
    return SloThresholdBasedExecutionSlaMetricsCollectorImpl.COLLECTOR_NAME;
  }

  override getMetricsCollectorVersion(): string {
    return SloThresholdBasedExecutionSlaMetricsCollectorImpl.COLLECTOR_VERSION;
  }

  override getSloThresholdMs(): number {
    return this.sloThresholdMs;
  }

  override resetMetrics(): void {
    this.totalExecutions = 0;
    this.totalFailures = 0;
    this.totalTimeouts = 0;
    this.totalDurationMs = 0;
  }
}
