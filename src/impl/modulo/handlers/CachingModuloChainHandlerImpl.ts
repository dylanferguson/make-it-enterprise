import { AbstractBaseModuloOperationChainHandler } from "../../../abstracts/AbstractBaseModuloOperationChainHandler.js";

const CACHE_SIZE_LIMIT = 128;

export class CachingModuloChainHandlerImpl extends AbstractBaseModuloOperationChainHandler {
  private static readonly HANDLER_NAME = "CachingModuloChainHandler";
  private static readonly HANDLER_PRIORITY = 75;

  private readonly cache: Map<string, number> = new Map();

  override handleModulo(dividend: number, divisor: number, context: string | null): number {
    const cacheKey = `${dividend}:${divisor}`;
    const cached = this.cache.get(cacheKey);
    if (cached !== undefined) {
      return cached;
    }
    const result = this.proceedToNext(dividend, divisor, context);
    if (this.cache.size < CACHE_SIZE_LIMIT) {
      this.cache.set(cacheKey, result);
    }
    return result;
  }

  override getHandlerName(): string {
    return CachingModuloChainHandlerImpl.HANDLER_NAME;
  }

  override getHandlerPriority(): number {
    return CachingModuloChainHandlerImpl.HANDLER_PRIORITY;
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}
