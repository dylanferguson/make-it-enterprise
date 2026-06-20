import type { ICacheEntry, ICacheKey } from "../../contracts/index.js";
import { AbstractBaseCacheEvictionPolicy } from "../../abstracts/index.js";

export class TtlCacheEvictionPolicyImpl extends AbstractBaseCacheEvictionPolicy {
  private static readonly POLICY_NAME = "TimeToLiveCacheEvictionPolicy";
  private static readonly POLICY_VERSION = "1.0.0-TTL-EVICTION";

  override getPolicyName(): string { return TtlCacheEvictionPolicyImpl.POLICY_NAME; }
  override getPolicyVersion(): string { return TtlCacheEvictionPolicyImpl.POLICY_VERSION; }

  override recordAccess<T>(entry: ICacheEntry<T>): void {}
  override recordInsertion<T>(entry: ICacheEntry<T>): void {}

  override shouldEvictOnAccess<T>(entry: ICacheEntry<T>): boolean {
    return entry.isExpired();
  }

  override selectEvictionCandidate<T>(entries: readonly ICacheEntry<T>[]): ICacheEntry<T> | null {
    for (const entry of entries) {
      if (entry.isExpired()) return entry;
    }
    return null;
  }

  override getPolicyDescriptor(): string {
    return `TTLEvictionPolicy[active=true]`;
  }
}
