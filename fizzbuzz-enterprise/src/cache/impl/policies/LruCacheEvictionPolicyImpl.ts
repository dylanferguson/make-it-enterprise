import type { ICacheEntry, ICacheKey } from "../../contracts/index.js";
import { AbstractBaseCacheEvictionPolicy } from "../../abstracts/index.js";

interface AccessRecord {
  keyHash: string;
  lastAccessTimestamp: number;
  insertionOrder: number;
}

export class LruCacheEvictionPolicyImpl extends AbstractBaseCacheEvictionPolicy {
  private static readonly POLICY_NAME = "LeastRecentlyUsedCacheEvictionPolicy";
  private static readonly POLICY_VERSION = "1.0.0-LRU-EVICTION";
  private readonly accessRecords: Map<string, AccessRecord> = new Map();
  private insertionCounter: number = 0;

  override getPolicyName(): string { return LruCacheEvictionPolicyImpl.POLICY_NAME; }
  override getPolicyVersion(): string { return LruCacheEvictionPolicyImpl.POLICY_VERSION; }

  override recordAccess<T>(entry: ICacheEntry<T>): void {
    const hash = entry.getCacheKey().getKeyHash();
    const existing = this.accessRecords.get(hash);
    if (existing) {
      existing.lastAccessTimestamp = Date.now();
    }
  }

  override recordInsertion<T>(entry: ICacheEntry<T>): void {
    const hash = entry.getCacheKey().getKeyHash();
    this.accessRecords.set(hash, {
      keyHash: hash,
      lastAccessTimestamp: Date.now(),
      insertionOrder: this.insertionCounter++,
    });
  }

  override shouldEvictOnAccess<T>(entry: ICacheEntry<T>): boolean {
    return false;
  }

  override selectEvictionCandidate<T>(entries: readonly ICacheEntry<T>[]): ICacheEntry<T> | null {
    if (entries.length === 0) return null;
    let oldestAccess = Infinity;
    let candidate: ICacheEntry<T> | null = null;
    for (const entry of entries) {
      const record = this.accessRecords.get(entry.getCacheKey().getKeyHash());
      const lastAccess = record ? record.lastAccessTimestamp : 0;
      if (lastAccess < oldestAccess) {
        oldestAccess = lastAccess;
        candidate = entry;
      }
    }
    return candidate;
  }

  override getPolicyDescriptor(): string {
    return `LRUEvictionPolicy[trackedEntries=${this.accessRecords.size}]`;
  }
}
