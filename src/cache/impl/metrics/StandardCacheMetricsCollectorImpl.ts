import { AbstractBaseCacheMetricsCollector } from "../../abstracts/index.js";

interface LevelMetrics {
  hitCount: number;
  missCount: number;
  evictionCount: number;
  putCount: number;
  clearCount: number;
}

export class StandardCacheMetricsCollectorImpl extends AbstractBaseCacheMetricsCollector {
  private static readonly COLLECTOR_NAME = "StandardCacheMetricsCollector";
  private static readonly COLLECTOR_VERSION = "1.0.0-CACHE-METRICS";

  private readonly levelMetrics: Map<string, LevelMetrics> = new Map();

  override getCollectorName(): string { return StandardCacheMetricsCollectorImpl.COLLECTOR_NAME; }
  override getCollectorVersion(): string { return StandardCacheMetricsCollectorImpl.COLLECTOR_VERSION; }

  private ensureLevel(levelName: string): LevelMetrics {
    if (!this.levelMetrics.has(levelName)) {
      this.levelMetrics.set(levelName, { hitCount: 0, missCount: 0, evictionCount: 0, putCount: 0, clearCount: 0 });
    }
    return this.levelMetrics.get(levelName)!;
  }

  override recordCacheHit(levelName: string): void {
    this.ensureLevel(levelName).hitCount++;
  }

  override recordCacheMiss(levelName: string): void {
    this.ensureLevel(levelName).missCount++;
  }

  override recordCacheEviction(levelName: string, policyName: string): void {
    this.ensureLevel(levelName).evictionCount++;
  }

  override recordCachePut(levelName: string): void {
    this.ensureLevel(levelName).putCount++;
  }

  override recordCacheClear(levelName: string): void {
    this.ensureLevel(levelName).clearCount++;
  }

  override getHitCount(levelName: string): number {
    const m = this.levelMetrics.get(levelName);
    return m ? m.hitCount : 0;
  }

  override getMissCount(levelName: string): number {
    const m = this.levelMetrics.get(levelName);
    return m ? m.missCount : 0;
  }

  override getEvictionCount(levelName: string): number {
    const m = this.levelMetrics.get(levelName);
    return m ? m.evictionCount : 0;
  }

  override getTotalHitRatio(): number {
    let totalHits = 0;
    let totalMisses = 0;
    for (const m of this.levelMetrics.values()) {
      totalHits += m.hitCount;
      totalMisses += m.missCount;
    }
    const total = totalHits + totalMisses;
    return total === 0 ? 0 : totalHits / total;
  }

  override getAggregateMetricsDescriptor(): string {
    const parts: string[] = [];
    for (const [name, m] of this.levelMetrics.entries()) {
      const total = m.hitCount + m.missCount;
      const ratio = total === 0 ? 0 : ((m.hitCount / total) * 100).toFixed(1);
      parts.push(`${name}: hits=${m.hitCount}, misses=${m.missCount}, evictions=${m.evictionCount}, hitRatio=${ratio}%`);
    }
    return `CacheMetrics[totalHitRatio=${(this.getTotalHitRatio() * 100).toFixed(1)}%, levels=[${parts.join("; ")}]]`;
  }
}
