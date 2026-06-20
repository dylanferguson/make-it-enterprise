import type { ICacheKey, ICacheEntry, ICacheEvictionPolicy, ICacheLevel, ICacheClusterNode, ICacheClusterTopology, ICacheCoherencyProtocol, ICacheWarmupStrategy, ICacheMetricsCollector, IEnterpriseComputationCacheManager, ICacheAwareExpressionEvaluatorDecorator } from "../contracts/index.js";

export abstract class AbstractBaseCacheKey implements ICacheKey {
  private readonly keyTimestamp: number;
  constructor() { this.keyTimestamp = Date.now(); }
  abstract getKeyHash(): string;
  abstract getKeyDescriptor(): string;
  abstract getKeyComponents(): readonly unknown[];
  getKeyTimestamp(): number { return this.keyTimestamp; }
}

export abstract class AbstractBaseCacheEntry<T> implements ICacheEntry<T> {
  private readonly cacheKey: ICacheKey;
  private readonly cachedValue: T;
  private readonly cachedAtTimestamp: number;
  private readonly timeToLiveMs: number;
  constructor(cacheKey: ICacheKey, cachedValue: T, timeToLiveMs: number) {
    this.cacheKey = cacheKey; this.cachedValue = cachedValue;
    this.cachedAtTimestamp = Date.now(); this.timeToLiveMs = timeToLiveMs;
  }
  getCacheKey(): ICacheKey { return this.cacheKey; }
  getCachedValue(): T { return this.cachedValue; }
  getCachedAtTimestamp(): number { return this.cachedAtTimestamp; }
  getTimeToLiveMs(): number { return this.timeToLiveMs; }
  isExpired(): boolean { return Date.now() - this.cachedAtTimestamp > this.timeToLiveMs; }
  abstract getEntryDescriptor(): string;
}

export abstract class AbstractBaseCacheEvictionPolicy implements ICacheEvictionPolicy {
  abstract getPolicyName(): string;
  abstract getPolicyVersion(): string;
  abstract recordAccess<T>(entry: ICacheEntry<T>): void;
  abstract recordInsertion<T>(entry: ICacheEntry<T>): void;
  abstract shouldEvictOnAccess<T>(entry: ICacheEntry<T>): boolean;
  abstract selectEvictionCandidate<T>(entries: readonly ICacheEntry<T>[]): ICacheEntry<T> | null;
  abstract getPolicyDescriptor(): string;
}

export abstract class AbstractBaseCacheLevel<T> implements ICacheLevel<T> {
  private readonly levelName: string;
  private readonly levelNumber: number;
  private readonly maximumCapacity: number;
  private hitCount: number = 0;
  private missCount: number = 0;
  constructor(levelName: string, levelNumber: number, maximumCapacity: number) {
    this.levelName = levelName; this.levelNumber = levelNumber; this.maximumCapacity = maximumCapacity;
  }
  getLevelName(): string { return this.levelName; }
  getLevelNumber(): number { return this.levelNumber; }
  getMaximumCapacity(): number { return this.maximumCapacity; }
  getHitCount(): number { return this.hitCount; }
  getMissCount(): number { return this.missCount; }
  getHitRatio(): number {
    const total = this.hitCount + this.missCount;
    return total === 0 ? 0 : this.hitCount / total;
  }
  protected recordHit(): void { this.hitCount++; }
  protected recordMiss(): void { this.missCount++; }
  abstract getLevelDescriptor(): string;
  abstract getCurrentSize(): number;
  abstract getEvictionPolicy(): ICacheEvictionPolicy;
  abstract get(key: ICacheKey): ICacheEntry<T> | null;
  abstract put(key: ICacheKey, entry: ICacheEntry<T>): boolean;
  abstract remove(key: ICacheKey): boolean;
  abstract clear(): void;
  abstract contains(key: ICacheKey): boolean;
}

export abstract class AbstractBaseCacheClusterNode implements ICacheClusterNode {
  private readonly nodeName: string;
  private readonly nodeId: string;
  private readonly nodeVersion: string;
  constructor(nodeName: string, nodeId: string, nodeVersion: string) {
    this.nodeName = nodeName; this.nodeId = nodeId; this.nodeVersion = nodeVersion;
  }
  getNodeName(): string { return this.nodeName; }
  getNodeId(): string { return this.nodeId; }
  getNodeVersion(): string { return this.nodeVersion; }
  abstract isOnline(): boolean;
  abstract getRegisteredCacheLevelDescriptors(): readonly string[];
  abstract synchronize(): boolean;
  abstract getNodeDescriptor(): string;
}

export abstract class AbstractBaseCacheClusterTopology implements ICacheClusterTopology {
  private readonly topologyName: string;
  private readonly topologyVersion: string;
  constructor(topologyName: string, topologyVersion: string) {
    this.topologyName = topologyName; this.topologyVersion = topologyVersion;
  }
  getTopologyName(): string { return this.topologyName; }
  getTopologyVersion(): string { return this.topologyVersion; }
  abstract getNodeCount(): number;
  abstract getNodes(): readonly ICacheClusterNode[];
  abstract getPrimaryNode(): ICacheClusterNode;
  abstract getReplicaNodes(): readonly ICacheClusterNode[];
  abstract isTopologyHealthy(): boolean;
  abstract getTopologyDescriptor(): string;
}

export abstract class AbstractBaseCacheCoherencyProtocol implements ICacheCoherencyProtocol {
  private readonly protocolName: string;
  private readonly protocolVersion: string;
  protected readonly registeredLevels: Map<string, ICacheLevel<any>> = new Map();
  constructor(protocolName: string, protocolVersion: string) {
    this.protocolName = protocolName; this.protocolVersion = protocolVersion;
  }
  getProtocolName(): string { return this.protocolName; }
  getProtocolVersion(): string { return this.protocolVersion; }
  protected registerLevel<T>(level: ICacheLevel<T>): void {
    this.registeredLevels.set(level.getLevelName(), level);
  }
  getRegisteredLevels<T>(): readonly ICacheLevel<T>[] {
    return Array.from(this.registeredLevels.values());
  }
  abstract notifyEntryInserted<T>(cacheLevel: ICacheLevel<T>, key: ICacheKey, entry: ICacheEntry<T>): void;
  abstract notifyEntryInvalidated<T>(cacheLevel: ICacheLevel<T>, key: ICacheKey): void;
  abstract notifyCacheCleared<T>(cacheLevel: ICacheLevel<T>): void;
  abstract getProtocolDescriptor(): string;
}

export abstract class AbstractBaseCacheWarmupStrategy implements ICacheWarmupStrategy {
  private warmupComplete: boolean = false;
  abstract getStrategyName(): string;
  abstract getStrategyVersion(): string;
  abstract getWarmupTargetLevels<T>(): readonly ICacheLevel<T>[];
  abstract getPrecomputedEntries<T>(): readonly ICacheEntry<T>[];
  abstract warmup<T>(level: ICacheLevel<T>, entries: readonly ICacheEntry<T>[]): number;
  isWarmupComplete(): boolean { return this.warmupComplete; }
  protected markWarmupComplete(): void { this.warmupComplete = true; }
  abstract getWarmupDescriptor(): string;
}

export abstract class AbstractBaseCacheMetricsCollector implements ICacheMetricsCollector {
  abstract getCollectorName(): string;
  abstract getCollectorVersion(): string;
  abstract recordCacheHit(levelName: string): void;
  abstract recordCacheMiss(levelName: string): void;
  abstract recordCacheEviction(levelName: string, policyName: string): void;
  abstract recordCachePut(levelName: string): void;
  abstract recordCacheClear(levelName: string): void;
  abstract getHitCount(levelName: string): number;
  abstract getMissCount(levelName: string): number;
  abstract getEvictionCount(levelName: string): number;
  abstract getTotalHitRatio(): number;
  abstract getAggregateMetricsDescriptor(): string;
}

export abstract class AbstractBaseEnterpriseComputationCacheManager implements IEnterpriseComputationCacheManager {
  private readonly managerName: string;
  private readonly managerVersion: string;
  constructor(managerName: string, managerVersion: string) {
    this.managerName = managerName; this.managerVersion = managerVersion;
  }
  getManagerName(): string { return this.managerName; }
  getManagerVersion(): string { return this.managerVersion; }
  abstract getL1CacheLevel<T>(): ICacheLevel<T>;
  abstract getL2CacheLevel<T>(): ICacheLevel<T>;
  abstract getClusterNode(): ICacheClusterNode;
  abstract getClusterTopology(): ICacheClusterTopology;
  abstract getCoherencyProtocol(): ICacheCoherencyProtocol;
  abstract getWarmupStrategy(): ICacheWarmupStrategy;
  abstract getMetricsCollector(): ICacheMetricsCollector;
  abstract resolveValue<T>(key: ICacheKey, valueLoader: () => T): T;
  abstract invalidateEntry(key: ICacheKey): boolean;
  abstract clearAllCaches(): void;
  abstract warmupAllCaches(): number;
  abstract isCacheInfrastructureReady(): boolean;
  abstract getCacheManagerDescriptor(): string;
}

export abstract class AbstractBaseCacheAwareExpressionEvaluatorDecorator implements ICacheAwareExpressionEvaluatorDecorator {
  private readonly decoratorName: string;
  private readonly decoratorVersion: string;
  constructor(decoratorName: string, decoratorVersion: string) {
    this.decoratorName = decoratorName; this.decoratorVersion = decoratorVersion;
  }
  getDecoratorName(): string { return this.decoratorName; }
  getDecoratorVersion(): string { return this.decoratorVersion; }
  abstract getCacheManager(): IEnterpriseComputationCacheManager;
  abstract getDelegatingEvaluatorName(): string;
  abstract getDecoratorDescriptor(): string;
}
