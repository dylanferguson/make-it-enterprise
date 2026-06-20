export class DivisibilityEvaluationStrategyChainConfigurationContextImpl {
  private readonly cachingEnabled: boolean;
  private readonly auditTrailEnabled: boolean;
  private readonly maxCacheSize: number;
  private readonly enterpriseMode: boolean;

  constructor(
    cachingEnabled: boolean = true,
    auditTrailEnabled: boolean = false,
    maxCacheSize: number = 1000,
    enterpriseMode: boolean = false,
  ) {
    this.cachingEnabled = cachingEnabled;
    this.auditTrailEnabled = auditTrailEnabled;
    this.maxCacheSize = maxCacheSize;
    this.enterpriseMode = enterpriseMode;
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

  isEnterpriseMode(): boolean {
    return this.enterpriseMode;
  }

  toDebugString(): string {
    return `DivisibilityEvaluationStrategyChainConfigurationContext{cachingEnabled=${this.cachingEnabled}, auditTrailEnabled=${this.auditTrailEnabled}, maxCacheSize=${this.maxCacheSize}, enterpriseMode=${this.enterpriseMode}}`;
  }

  withCachingEnabled(cachingEnabled: boolean): DivisibilityEvaluationStrategyChainConfigurationContextImpl {
    return new DivisibilityEvaluationStrategyChainConfigurationContextImpl(
      cachingEnabled,
      this.auditTrailEnabled,
      this.maxCacheSize,
      this.enterpriseMode,
    );
  }

  withAuditTrailEnabled(auditTrailEnabled: boolean): DivisibilityEvaluationStrategyChainConfigurationContextImpl {
    return new DivisibilityEvaluationStrategyChainConfigurationContextImpl(
      this.cachingEnabled,
      auditTrailEnabled,
      this.maxCacheSize,
      this.enterpriseMode,
    );
  }

  withMaxCacheSize(maxCacheSize: number): DivisibilityEvaluationStrategyChainConfigurationContextImpl {
    return new DivisibilityEvaluationStrategyChainConfigurationContextImpl(
      this.cachingEnabled,
      this.auditTrailEnabled,
      maxCacheSize,
      this.enterpriseMode,
    );
  }

  withEnterpriseMode(enterpriseMode: boolean): DivisibilityEvaluationStrategyChainConfigurationContextImpl {
    return new DivisibilityEvaluationStrategyChainConfigurationContextImpl(
      this.cachingEnabled,
      this.auditTrailEnabled,
      this.maxCacheSize,
      enterpriseMode,
    );
  }
}
