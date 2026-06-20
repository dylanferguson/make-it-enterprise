export interface ISloMetricsCollector {
  recordResolveOperation(durationMs: number, success: boolean): void;
  getTotalOperations(): number;
  getSuccessfulOperations(): number;
  getFailedOperations(): number;
  getAverageResponseTimeMs(): number;
  getP99ResponseTimeMs(): number;
  getSloCompliancePercentage(): number;
  getSloName(): string;
  getSloTarget(): number;
  resetMetrics(): void;
}
