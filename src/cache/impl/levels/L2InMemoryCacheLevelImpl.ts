import type { ICacheEntry, ICacheEvictionPolicy, ICacheKey } from "../../contracts/index.js";
import { AbstractBaseCacheLevel } from "../../abstracts/index.js";

export class L2InMemoryCacheLevelImpl extends AbstractBaseCacheLevel<boolean> {
  private static readonly LEVEL_NAME = "L2InMemoryCacheLevel";
  private static readonly LEVEL_NUMBER = 2;
  private static readonly DEFAULT_CAPACITY = 1024;

  private readonly store: Map<string, ICacheEntry<boolean>> = new Map();
  private readonly evictionPolicy: ICacheEvictionPolicy;
  private readonly ttlOverrideMs: number;

  constructor(evictionPolicy: ICacheEvictionPolicy, ttlOverrideMs?: number) {
    super(L2InMemoryCacheLevelImpl.LEVEL_NAME, L2InMemoryCacheLevelImpl.LEVEL_NUMBER, L2InMemoryCacheLevelImpl.DEFAULT_CAPACITY);
    this.evictionPolicy = evictionPolicy;
    this.ttlOverrideMs = ttlOverrideMs ?? 120000;
  }

  override getLevelDescriptor(): string {
    return `L2InMemoryCache[size=${this.getCurrentSize()}, max=${this.getMaximumCapacity()}, ` +
      `ttlOverride=${this.ttlOverrideMs}ms, ` +
      `hits=${this.getHitCount()}, misses=${this.getMissCount()}, hitRatio=${(this.getHitRatio() * 100).toFixed(1)}%]`;
  }

  override getCurrentSize(): number { return this.store.size; }
  override getEvictionPolicy(): ICacheEvictionPolicy { return this.evictionPolicy; }

  override get(key: ICacheKey): ICacheEntry<boolean> | null {
    const entry = this.store.get(key.getKeyHash());
    if (!entry || entry.isExpired()) {
      if (entry) this.store.delete(key.getKeyHash());
      this.recordMiss();
      return null;
    }
    this.evictionPolicy.recordAccess(entry);
    this.recordHit();
    return entry;
  }

  override put(key: ICacheKey, entry: ICacheEntry<boolean>): boolean {
    if (this.store.size >= this.getMaximumCapacity() && !this.store.has(key.getKeyHash())) {
      const entries = Array.from(this.store.values());
      const candidate = this.evictionPolicy.selectEvictionCandidate(entries);
      if (candidate !== null) this.store.delete(candidate.getCacheKey().getKeyHash());
    }
    this.store.set(key.getKeyHash(), entry);
    this.evictionPolicy.recordInsertion(entry);
    return true;
  }

  override remove(key: ICacheKey): boolean { return this.store.delete(key.getKeyHash()); }
  override clear(): void { this.store.clear(); }
  override contains(key: ICacheKey): boolean { return this.store.has(key.getKeyHash()); }
}
