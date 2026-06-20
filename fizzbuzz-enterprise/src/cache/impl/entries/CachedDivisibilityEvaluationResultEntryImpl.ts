import type { ICacheKey } from "../../contracts/index.js";
import { AbstractBaseCacheEntry } from "../../abstracts/index.js";

export class CachedDivisibilityEvaluationResultEntryImpl extends AbstractBaseCacheEntry<boolean> {
  private static readonly DEFAULT_TTL_MS = 30000;

  constructor(cacheKey: ICacheKey, isDivisible: boolean) {
    super(cacheKey, isDivisible, CachedDivisibilityEvaluationResultEntryImpl.DEFAULT_TTL_MS);
  }

  override getEntryDescriptor(): string {
    return `CachedDivisibilityEvaluationResult[key=${this.getCacheKey().getKeyHash()}, ` +
      `value=${this.getCachedValue()}, ` +
      `ttl=${this.getTimeToLiveMs()}ms, ` +
      `cachedAt=${this.getCachedAtTimestamp()}]`;
  }
}
