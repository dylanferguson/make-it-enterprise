import type { ICacheEntry, ICacheKey, ICacheLevel } from "../../contracts/index.js";
import { AbstractBaseCacheWarmupStrategy } from "../../abstracts/index.js";

export class PrecomputedDivisibilityCacheWarmupStrategyImpl extends AbstractBaseCacheWarmupStrategy {
  private static readonly STRATEGY_NAME = "PrecomputedDivisibilityCacheWarmupStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-PRECOMPUTED-WARMUP";
  private static readonly PRECOMPUTED_DIVIDENDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 45, 60, 75, 100];
  private static readonly PRECOMPUTED_DIVISORS = [3, 5, 15];

  override getStrategyName(): string { return PrecomputedDivisibilityCacheWarmupStrategyImpl.STRATEGY_NAME; }
  override getStrategyVersion(): string { return PrecomputedDivisibilityCacheWarmupStrategyImpl.STRATEGY_VERSION; }

  override getWarmupTargetLevels<T>(): readonly ICacheLevel<T>[] {
    return [];
  }

  override getPrecomputedEntries<T>(): readonly ICacheEntry<T>[] {
    return [];
  }

  override warmup<T>(level: ICacheLevel<T>, entries: readonly ICacheEntry<T>[]): number {
    let warmedCount = 0;
    for (const entry of entries) {
      level.put(entry.getCacheKey(), entry as unknown as ICacheEntry<T>);
      warmedCount++;
    }
    this.markWarmupComplete();
    return warmedCount;
  }

  getPrecomputedDividends(): readonly number[] {
    return PrecomputedDivisibilityCacheWarmupStrategyImpl.PRECOMPUTED_DIVIDENDS;
  }

  getPrecomputedDivisors(): readonly number[] {
    return PrecomputedDivisibilityCacheWarmupStrategyImpl.PRECOMPUTED_DIVISORS;
  }

  override getWarmupDescriptor(): string {
    return `PrecomputedDivisibilityWarmup[dividends=${this.getPrecomputedDividends().length}, ` +
      `divisors=${this.getPrecomputedDivisors().length}, ` +
      `warmupComplete=${this.isWarmupComplete()}]`;
  }
}
