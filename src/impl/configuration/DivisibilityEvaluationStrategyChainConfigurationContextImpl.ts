export class DivisibilityEvaluationStrategyChainConfigurationContextImpl {
  private readonly cachingEnabled: boolean;
  private readonly auditTrailEnabled: boolean;
  private readonly maxCacheSize: number;

  constructor(
    cachingEnabled: boolean = true,
    auditTrailEnabled: boolean = false,
    maxCacheSize: number = 1000,
  ) {
    this.cachingEnabled = cachingEnabled;
    this.auditTrailEnabled = auditTrailEnabled;
    this.maxCacheSize = maxCacheSize;
  }

  isCachingEnabled(): boolean {
    return this.cachingEnabled;
  }

  isAuditTrailEnabled(): boolean {
    return this.auditTrailEnabled;
  }

  getMaxCacheSize(): number {
    return this.maxCacheSize;
  }

  toDebugString(): string {
    return `DivisibilityEvaluationStrategyChainConfigurationContext{cachingEnabled=${this.cachingEnabled}, auditTrailEnabled=${this.auditTrailEnabled}, maxCacheSize=${this.maxCacheSize}}`;
  }

  withCachingEnabled(cachingEnabled: boolean): DivisibilityEvaluationStrategyChainConfigurationContextImpl {
    return new DivisibilityEvaluationStrategyChainConfigurationContextImpl(
      cachingEnabled,
      this.auditTrailEnabled,
      this.maxCacheSize,
    );
  }

  withAuditTrailEnabled(auditTrailEnabled: boolean): DivisibilityEvaluationStrategyChainConfigurationContextImpl {
    return new DivisibilityEvaluationStrategyChainConfigurationContextImpl(
      this.cachingEnabled,
      auditTrailEnabled,
      this.maxCacheSize,
    );
  }

  withMaxCacheSize(maxCacheSize: number): DivisibilityEvaluationStrategyChainConfigurationContextImpl {
    return new DivisibilityEvaluationStrategyChainConfigurationContextImpl(
      this.cachingEnabled,
      this.auditTrailEnabled,
      maxCacheSize,
    );
  }
}
