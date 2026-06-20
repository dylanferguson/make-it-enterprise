export class EnterpriseDivisibilityEvaluationStrategyChainConfigurationContextImpl {
  private readonly cachingEnabled: boolean;
  private readonly auditTrailEnabled: boolean;
  private readonly validationEnabled: boolean;
  private readonly metricsCollectionEnabled: boolean;
  private readonly latencyThresholdEnabled: boolean;
  private readonly threadBoundaryEnabled: boolean;
  private readonly maxCacheSize: number;
  private readonly latencyWarnThresholdMs: number;
  private readonly latencyCriticalThresholdMs: number;

  constructor(
    cachingEnabled: boolean = true,
    auditTrailEnabled: boolean = false,
    validationEnabled: boolean = true,
    metricsCollectionEnabled: boolean = true,
    latencyThresholdEnabled: boolean = true,
    threadBoundaryEnabled: boolean = true,
    maxCacheSize: number = 1000,
    latencyWarnThresholdMs: number = 5,
    latencyCriticalThresholdMs: number = 20,
  ) {
    this.cachingEnabled = cachingEnabled;
    this.auditTrailEnabled = auditTrailEnabled;
    this.validationEnabled = validationEnabled;
    this.metricsCollectionEnabled = metricsCollectionEnabled;
    this.latencyThresholdEnabled = latencyThresholdEnabled;
    this.threadBoundaryEnabled = threadBoundaryEnabled;
    this.maxCacheSize = maxCacheSize;
    this.latencyWarnThresholdMs = latencyWarnThresholdMs;
    this.latencyCriticalThresholdMs = latencyCriticalThresholdMs;
  }

  isCachingEnabled(): boolean { return this.cachingEnabled; }
  isAuditTrailEnabled(): boolean { return this.auditTrailEnabled; }
  isValidationEnabled(): boolean { return this.validationEnabled; }
  isMetricsCollectionEnabled(): boolean { return this.metricsCollectionEnabled; }
  isLatencyThresholdEnabled(): boolean { return this.latencyThresholdEnabled; }
  isThreadBoundaryEnabled(): boolean { return this.threadBoundaryEnabled; }
  getMaxCacheSize(): number { return this.maxCacheSize; }
  getLatencyWarnThresholdMs(): number { return this.latencyWarnThresholdMs; }
  getLatencyCriticalThresholdMs(): number { return this.latencyCriticalThresholdMs; }

  toDebugString(): string {
    return `EnterpriseDivisibilityEvaluationStrategyChainConfigurationContext{caching=${this.cachingEnabled}, audit=${this.auditTrailEnabled}, validation=${this.validationEnabled}, metrics=${this.metricsCollectionEnabled}, latency=${this.latencyThresholdEnabled}, threadBoundary=${this.threadBoundaryEnabled}, maxCacheSize=${this.maxCacheSize}, warnMs=${this.latencyWarnThresholdMs}, critMs=${this.latencyCriticalThresholdMs}}`;
  }
}
