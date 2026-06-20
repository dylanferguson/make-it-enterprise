export interface ICacheKey {
  getKeyHash(): string;
  getKeyDescriptor(): string;
  getKeyComponents(): readonly unknown[];
  getKeyTimestamp(): number;
}

export interface ICacheEntry<T> {
  getCacheKey(): ICacheKey;
  getCachedValue(): T;
  getCachedAtTimestamp(): number;
  getTimeToLiveMs(): number;
  isExpired(): boolean;
  getEntryDescriptor(): string;
}

export interface ICacheEvictionPolicy {
  getPolicyName(): string;
  getPolicyVersion(): string;
  recordAccess<T>(entry: ICacheEntry<T>): void;
  recordInsertion<T>(entry: ICacheEntry<T>): void;
  shouldEvictOnAccess<T>(entry: ICacheEntry<T>): boolean;
  selectEvictionCandidate<T>(entries: readonly ICacheEntry<T>[]): ICacheEntry<T> | null;
  getPolicyDescriptor(): string;
}

export interface ICacheLevel<T> {
  getLevelName(): string;
  getLevelNumber(): number;
  getLevelDescriptor(): string;
  getMaximumCapacity(): number;
  getCurrentSize(): number;
  getEvictionPolicy(): ICacheEvictionPolicy;
  get(key: ICacheKey): ICacheEntry<T> | null;
  put(key: ICacheKey, entry: ICacheEntry<T>): boolean;
  remove(key: ICacheKey): boolean;
  clear(): void;
  contains(key: ICacheKey): boolean;
  getHitCount(): number;
  getMissCount(): number;
  getHitRatio(): number;
}

export interface ICacheClusterNode {
  getNodeName(): string;
  getNodeId(): string;
  getNodeVersion(): string;
  isOnline(): boolean;
  getRegisteredCacheLevelDescriptors(): readonly string[];
  synchronize(): boolean;
  getNodeDescriptor(): string;
}

export interface ICacheClusterTopology {
  getTopologyName(): string;
  getTopologyVersion(): string;
  getNodeCount(): number;
  getNodes(): readonly ICacheClusterNode[];
  getPrimaryNode(): ICacheClusterNode;
  getReplicaNodes(): readonly ICacheClusterNode[];
  isTopologyHealthy(): boolean;
  getTopologyDescriptor(): string;
}

export interface ICacheCoherencyProtocol {
  getProtocolName(): string;
  getProtocolVersion(): string;
  notifyEntryInserted<T>(cacheLevel: ICacheLevel<T>, key: ICacheKey, entry: ICacheEntry<T>): void;
  notifyEntryInvalidated<T>(cacheLevel: ICacheLevel<T>, key: ICacheKey): void;
  notifyCacheCleared<T>(cacheLevel: ICacheLevel<T>): void;
  getRegisteredLevels<T>(): readonly ICacheLevel<T>[];
  getProtocolDescriptor(): string;
}

export interface ICacheWarmupStrategy {
  getStrategyName(): string;
  getStrategyVersion(): string;
  getWarmupTargetLevels<T>(): readonly ICacheLevel<T>[];
  getPrecomputedEntries<T>(): readonly ICacheEntry<T>[];
  warmup<T>(level: ICacheLevel<T>, entries: readonly ICacheEntry<T>[]): number;
  isWarmupComplete(): boolean;
  getWarmupDescriptor(): string;
}

export interface ICacheMetricsCollector {
  getCollectorName(): string;
  getCollectorVersion(): string;
  recordCacheHit(levelName: string): void;
  recordCacheMiss(levelName: string): void;
  recordCacheEviction(levelName: string, policyName: string): void;
  recordCachePut(levelName: string): void;
  recordCacheClear(levelName: string): void;
  getHitCount(levelName: string): number;
  getMissCount(levelName: string): number;
  getEvictionCount(levelName: string): number;
  getTotalHitRatio(): number;
  getAggregateMetricsDescriptor(): string;
}

export interface IEnterpriseComputationCacheManager {
  getManagerName(): string;
  getManagerVersion(): string;
  getL1CacheLevel<T>(): ICacheLevel<T>;
  getL2CacheLevel<T>(): ICacheLevel<T>;
  getClusterNode(): ICacheClusterNode;
  getClusterTopology(): ICacheClusterTopology;
  getCoherencyProtocol(): ICacheCoherencyProtocol;
  getWarmupStrategy(): ICacheWarmupStrategy;
  getMetricsCollector(): ICacheMetricsCollector;
  resolveValue<T>(key: ICacheKey, valueLoader: () => T): T;
  invalidateEntry(key: ICacheKey): boolean;
  clearAllCaches(): void;
  warmupAllCaches(): number;
  isCacheInfrastructureReady(): boolean;
  getCacheManagerDescriptor(): string;
}

export interface ICacheAwareExpressionEvaluatorDecorator {
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  getCacheManager(): IEnterpriseComputationCacheManager;
  getDelegatingEvaluatorName(): string;
  getDecoratorDescriptor(): string;
}
