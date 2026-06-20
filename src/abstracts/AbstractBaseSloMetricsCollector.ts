import type { ISloMetricsCollector } from "../contracts/ISloMetricsCollector.js";

export abstract class AbstractBaseSloMetricsCollector implements ISloMetricsCollector {
  protected totalOperations: number = 0;
  protected successfulOperations: number = 0;
  protected failedOperations: number = 0;
  protected totalResponseTimeMs: number = 0;
  protected readonly percentileBuckets: number[] = [];
  protected readonly sloName: string;
  protected readonly sloTarget: number;

  constructor(sloName: string, sloTarget: number = 99.9) {
    this.sloName = sloName;
    this.sloTarget = sloTarget;
  }

  abstract recordResolveOperation(durationMs: number, success: boolean): void;

  getTotalOperations(): number {
    return this.totalOperations;
  }

  getSuccessfulOperations(): number {
    return this.successfulOperations;
  }

  getFailedOperations(): number {
    return this.failedOperations;
  }

  getAverageResponseTimeMs(): number {
    if (this.totalOperations === 0) return 0;
    return this.totalResponseTimeMs / this.totalOperations;
  }

  abstract getP99ResponseTimeMs(): number;

  getSloCompliancePercentage(): number {
    if (this.totalOperations === 0) return 100;
    return (this.successfulOperations / this.totalOperations) * 100;
  }

  getSloName(): string {
    return this.sloName;
  }

  getSloTarget(): number {
    return this.sloTarget;
  }

  resetMetrics(): void {
    this.totalOperations = 0;
    this.successfulOperations = 0;
    this.failedOperations = 0;
    this.totalResponseTimeMs = 0;
    this.percentileBuckets.length = 0;
  }
}
