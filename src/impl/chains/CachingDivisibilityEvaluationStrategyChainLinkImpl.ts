import { AbstractBaseDivisibilityEvaluationStrategyChainLink } from "../../abstracts/AbstractBaseDivisibilityEvaluationStrategyChainLink.js";

export class CachingDivisibilityEvaluationStrategyChainLinkImpl extends AbstractBaseDivisibilityEvaluationStrategyChainLink {
  private static readonly LINK_NAME = "CachingDivisibilityEvaluationStrategyChainLink";
  private static readonly LINK_PRIORITY = 100;

  private readonly resultCache: Map<string, number> = new Map();
  private readonly maxCacheSize: number;
  private cacheHits: number = 0;
  private cacheMisses: number = 0;

  constructor(maxCacheSize: number = 1000) {
    super(CachingDivisibilityEvaluationStrategyChainLinkImpl.LINK_NAME, CachingDivisibilityEvaluationStrategyChainLinkImpl.LINK_PRIORITY);
    this.maxCacheSize = maxCacheSize;
  }

  override evaluate(dividend: number, divisor: number): number {
    this.assertOperandsValid(dividend, divisor);
    const cacheKey = this.buildCacheKey(dividend, divisor);
    const cached = this.resultCache.get(cacheKey);
    if (cached !== undefined) {
      this.cacheHits++;
      return cached;
    }
    this.cacheMisses++;
    const result = this.proceedToNext(dividend, divisor);
    this.storeInCache(cacheKey, result);
    return result;
  }

  override canHandle(_dividend: number, _divisor: number): boolean {
    return false;
  }

  getCacheHitRate(): number {
    const total = this.cacheHits + this.cacheMisses;
    if (total === 0) return 0;
    return this.cacheHits / total;
  }

  getCacheHits(): number {
    return this.cacheHits;
  }

  getCacheMisses(): number {
    return this.cacheMisses;
  }

  clearCache(): void {
    this.resultCache.clear();
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }

  private buildCacheKey(dividend: number, divisor: number): string {
    return `${dividend}:${divisor}`;
  }

  private storeInCache(key: string, value: number): void {
    if (this.resultCache.size >= this.maxCacheSize) {
      const firstKey = this.resultCache.keys().next().value;
      if (firstKey !== undefined) {
        this.resultCache.delete(firstKey);
      }
    }
    this.resultCache.set(key, value);
  }
}
