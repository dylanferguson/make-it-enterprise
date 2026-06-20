import type { ICacheKey, ICacheLevel, ICacheClusterNode, ICacheClusterTopology, ICacheCoherencyProtocol, ICacheWarmupStrategy, ICacheMetricsCollector, IEnterpriseComputationCacheManager, ICacheEntry } from "../../contracts/index.js";
import { AbstractBaseEnterpriseComputationCacheManager } from "../../abstracts/index.js";
import { DivisibilityEvaluationCacheKeyImpl } from "../keys/DivisibilityEvaluationCacheKeyImpl.js";
import { CachedDivisibilityEvaluationResultEntryImpl } from "../entries/CachedDivisibilityEvaluationResultEntryImpl.js";

export class EnterpriseComputationCacheManagerImpl extends AbstractBaseEnterpriseComputationCacheManager {
  private static readonly MANAGER_NAME = "EnterpriseComputationCacheManager";
  private static readonly MANAGER_VERSION = "1.0.0-CACHE-MANAGER";

  private readonly l1Cache: ICacheLevel<boolean>;
  private readonly l2Cache: ICacheLevel<boolean>;
  private readonly clusterNode: ICacheClusterNode;
  private readonly clusterTopology: ICacheClusterTopology;
  private readonly coherencyProtocol: ICacheCoherencyProtocol;
  private readonly warmupStrategy: ICacheWarmupStrategy;
  private readonly metricsCollector: ICacheMetricsCollector;
  private cacheInfrastructureReady: boolean = false;

  constructor(
    l1Cache: ICacheLevel<boolean>,
    l2Cache: ICacheLevel<boolean>,
    clusterNode: ICacheClusterNode,
    clusterTopology: ICacheClusterTopology,
    coherencyProtocol: ICacheCoherencyProtocol,
    warmupStrategy: ICacheWarmupStrategy,
    metricsCollector: ICacheMetricsCollector,
  ) {
    super(EnterpriseComputationCacheManagerImpl.MANAGER_NAME, EnterpriseComputationCacheManagerImpl.MANAGER_VERSION);
    this.l1Cache = l1Cache;
    this.l2Cache = l2Cache;
    this.clusterNode = clusterNode;
    this.clusterTopology = clusterTopology;
    this.coherencyProtocol = coherencyProtocol;
    this.warmupStrategy = warmupStrategy;
    this.metricsCollector = metricsCollector;
  }

  markInfrastructureReady(): void { this.cacheInfrastructureReady = true; }

  override getL1CacheLevel<T>(): ICacheLevel<T> { return this.l1Cache as unknown as ICacheLevel<T>; }
  override getL2CacheLevel<T>(): ICacheLevel<T> { return this.l2Cache as unknown as ICacheLevel<T>; }
  override getClusterNode(): ICacheClusterNode { return this.clusterNode; }
  override getClusterTopology(): ICacheClusterTopology { return this.clusterTopology; }
  override getCoherencyProtocol(): ICacheCoherencyProtocol { return this.coherencyProtocol; }
  override getWarmupStrategy(): ICacheWarmupStrategy { return this.warmupStrategy; }
  override getMetricsCollector(): ICacheMetricsCollector { return this.metricsCollector; }

  override resolveValue<T>(key: ICacheKey, valueLoader: () => T): T {
    const l1Entry = this.l1Cache.get(key);
    if (l1Entry !== null) {
      return l1Entry.getCachedValue() as unknown as T;
    }
    const l2Entry = this.l2Cache.get(key);
    if (l2Entry !== null) {
      const l1Copy = new CachedDivisibilityEvaluationResultEntryImpl(key, l2Entry.getCachedValue());
      this.l1Cache.put(key, l1Copy);
      return l2Entry.getCachedValue() as unknown as T;
    }
    const computedValue = valueLoader();
    const newEntry = new CachedDivisibilityEvaluationResultEntryImpl(key, computedValue as unknown as boolean);
    this.l1Cache.put(key, newEntry);
    this.l2Cache.put(key, newEntry);
    return computedValue;
  }

  override invalidateEntry(key: ICacheKey): boolean {
    const l1Removed = this.l1Cache.remove(key);
    const l2Removed = this.l2Cache.remove(key);
    this.coherencyProtocol.notifyEntryInvalidated(this.l1Cache, key);
    return l1Removed || l2Removed;
  }

  override clearAllCaches(): void {
    this.l1Cache.clear();
    this.l2Cache.clear();
    this.coherencyProtocol.notifyCacheCleared(this.l1Cache);
  }

  override warmupAllCaches(): number {
    const warmEntries: ICacheEntry<boolean>[] = [];
    const warmup = this.warmupStrategy as PrecomputedDivisibilityCacheWarmupStrategyImpl;
    for (const dividend of warmup.getPrecomputedDividends()) {
      for (const divisor of warmup.getPrecomputedDivisors()) {
        if (divisor === 0) continue;
        const key = new DivisibilityEvaluationCacheKeyImpl(dividend, divisor);
        const isDivisible = dividend % divisor === 0;
        const entry = new CachedDivisibilityEvaluationResultEntryImpl(key, isDivisible);
        warmEntries.push(entry);
      }
    }
    const l1Count = this.warmupStrategy.warmup(this.l1Cache, warmEntries);
    const l2Count = this.warmupStrategy.warmup(this.l2Cache, warmEntries);
    return l1Count + l2Count;
  }

  override isCacheInfrastructureReady(): boolean { return this.cacheInfrastructureReady; }

  override getCacheManagerDescriptor(): string {
    return `EnterpriseComputationCacheManager[l1=${this.l1Cache.getLevelDescriptor()}, ` +
      `l2=${this.l2Cache.getLevelDescriptor()}, ` +
      `topology=${this.clusterTopology.getTopologyDescriptor()}, ` +
      `warmup=${this.warmupStrategy.getWarmupDescriptor()}, ` +
      `metrics=${this.metricsCollector.getAggregateMetricsDescriptor()}, ` +
      `ready=${this.cacheInfrastructureReady}]`;
  }
}

import { PrecomputedDivisibilityCacheWarmupStrategyImpl } from "../warmup/PrecomputedDivisibilityCacheWarmupStrategyImpl.js";
