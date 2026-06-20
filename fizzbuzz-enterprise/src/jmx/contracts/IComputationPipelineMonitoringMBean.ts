export interface IComputationPipelineMonitoringMBean {
  getMBeanName(): string;
  getMBeanObjectNameDescriptor(): string;
  recordSingleValueResolution(value: number, durationMs: number): void;
  recordRangeResolution(start: number, end: number, durationMs: number, valueCount: number): void;
  recordCacheHit(): void;
  recordCacheMiss(): void;
  recordSlaBreach(durationMs: number): void;
  recordResolutionFailure(value: number, errorDescription: string): void;
  getTotalResolutionsAttempted(): number;
  getTotalResolutionsSucceeded(): number;
  getTotalResolutionsFailed(): number;
  getTotalCacheHits(): number;
  getTotalCacheMisses(): number;
  getAverageResolutionDurationMs(): number;
  getSlaBreachCount(): number;
  getSlaCompliancePercentage(): number;
  getSloThresholdMs(): number;
  resetMonitoringMetrics(): void;
}
