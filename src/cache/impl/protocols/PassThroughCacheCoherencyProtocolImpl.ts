import type { ICacheEntry, ICacheKey, ICacheLevel } from "../../contracts/index.js";
import { AbstractBaseCacheCoherencyProtocol } from "../../abstracts/index.js";

export class PassThroughCacheCoherencyProtocolImpl extends AbstractBaseCacheCoherencyProtocol {
  private static readonly PROTOCOL_NAME = "PassThroughCacheCoherencyProtocol";
  private static readonly PROTOCOL_VERSION = "1.0.0-PASS-THROUGH-COHERENCY";

  constructor() {
    super(PassThroughCacheCoherencyProtocolImpl.PROTOCOL_NAME, PassThroughCacheCoherencyProtocolImpl.PROTOCOL_VERSION);
  }

  override notifyEntryInserted<T>(cacheLevel: ICacheLevel<T>, key: ICacheKey, entry: ICacheEntry<T>): void {
  }

  override notifyEntryInvalidated<T>(cacheLevel: ICacheLevel<T>, key: ICacheKey): void {
    for (const level of this.getRegisteredLevels()) {
      if (level.getLevelName() !== cacheLevel.getLevelName()) {
        level.remove(key);
      }
    }
  }

  override notifyCacheCleared<T>(cacheLevel: ICacheLevel<T>): void {
  }

  override getProtocolDescriptor(): string {
    return `PassThroughCoherencyProtocol[registeredLevels=${this.getRegisteredLevels().length}]`;
  }
}
