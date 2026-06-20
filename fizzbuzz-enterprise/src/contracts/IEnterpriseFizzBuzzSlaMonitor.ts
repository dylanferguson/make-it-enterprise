export interface IEnterpriseFizzBuzzSlaMonitor {
  recordComputationDuration(durationMs: number, computationType: string): void;
  recordComputationResult(computationType: string, success: boolean): void;
  getAverageDurationMs(computationType: string): number;
  getP99DurationMs(computationType: string): number;
  getSuccessRate(computationType: string): number;
  getTotalComputations(computationType: string): number;
  isSlaBreached(computationType: string): boolean;
  getMonitorName(): string;
  getMonitorVersion(): string;
  resetMetrics(): void;
}
