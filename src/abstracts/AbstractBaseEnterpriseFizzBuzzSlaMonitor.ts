import type { IEnterpriseFizzBuzzSlaMonitor } from "../contracts/IEnterpriseFizzBuzzSlaMonitor.js";

export abstract class AbstractBaseEnterpriseFizzBuzzSlaMonitor
  implements IEnterpriseFizzBuzzSlaMonitor
{
  private readonly computationDurations: Map<string, number[]> = new Map();
  private readonly computationResults: Map<string, { success: number; failure: number }> = new Map();
  private readonly slaThresholdMs: number;

  constructor(slaThresholdMs: number = 100) {
    this.slaThresholdMs = slaThresholdMs;
  }

  abstract getMonitorName(): string;
  abstract getMonitorVersion(): string;

  recordComputationDuration(durationMs: number, computationType: string): void {
    const durations = this.computationDurations.get(computationType) ?? [];
    durations.push(durationMs);
    this.computationDurations.set(computationType, durations);
  }

  recordComputationResult(computationType: string, success: boolean): void {
    const results = this.computationResults.get(computationType) ?? { success: 0, failure: 0 };
    if (success) {
      results.success++;
    } else {
      results.failure++;
    }
    this.computationResults.set(computationType, results);
  }

  getAverageDurationMs(computationType: string): number {
    const durations = this.computationDurations.get(computationType);
    if (durations === undefined || durations.length === 0) {
      return 0;
    }
    return durations.reduce((a, b) => a + b, 0) / durations.length;
  }

  getP99DurationMs(computationType: string): number {
    const durations = this.computationDurations.get(computationType);
    if (durations === undefined || durations.length === 0) {
      return 0;
    }
    const sorted = [...durations].sort((a, b) => a - b);
    const index = Math.ceil(sorted.length * 0.99) - 1;
    const p99Index = Math.max(0, index);
    return p99Index < sorted.length ? (sorted[p99Index] as number) : 0;
  }

  getSuccessRate(computationType: string): number {
    const results = this.computationResults.get(computationType);
    if (results === undefined) {
      return 1;
    }
    const total = results.success + results.failure;
    if (total === 0) {
      return 1;
    }
    return results.success / total;
  }

  getTotalComputations(computationType: string): number {
    return (this.computationResults.get(computationType)?.success ?? 0) +
           (this.computationResults.get(computationType)?.failure ?? 0);
  }

  isSlaBreached(computationType: string): boolean {
    const p99 = this.getP99DurationMs(computationType);
    return p99 > this.slaThresholdMs;
  }

  resetMetrics(): void {
    this.computationDurations.clear();
    this.computationResults.clear();
  }

  protected getSlaThresholdMs(): number {
    return this.slaThresholdMs;
  }
}
