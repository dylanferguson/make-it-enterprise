import { AbstractBaseSloMetricsCollector } from "../../abstracts/AbstractBaseSloMetricsCollector.js";

export class SloMetricsCollectorImpl extends AbstractBaseSloMetricsCollector {
  private readonly latencySamples: number[] = [];

  constructor(
    sloName: string = "FizzBuzzResolveSLO",
    sloTarget: number = 99.9,
  ) {
    super(sloName, sloTarget);
  }

  override recordResolveOperation(
    durationMs: number,
    success: boolean,
  ): void {
    this.totalOperations++;
    this.totalResponseTimeMs += durationMs;
    this.latencySamples.push(durationMs);
    if (success) {
      this.successfulOperations++;
    } else {
      this.failedOperations++;
    }
  }

  override getP99ResponseTimeMs(): number {
    if (this.latencySamples.length === 0) return 0;
    const sorted = [...this.latencySamples].sort((a, b) => a - b);
    const index = Math.ceil(sorted.length * 0.99) - 1;
    return sorted[index] ?? 0;
  }

  override resetMetrics(): void {
    super.resetMetrics();
    this.latencySamples.length = 0;
  }
}
