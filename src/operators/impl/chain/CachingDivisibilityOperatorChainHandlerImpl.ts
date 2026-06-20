import { AbstractBaseDivisibilityOperatorDelegationChainHandler } from "../../abstracts/AbstractBaseDivisibilityOperatorDelegationChainHandler.js";

export class CachingDivisibilityOperatorChainHandlerImpl
  extends AbstractBaseDivisibilityOperatorDelegationChainHandler
{
  private static readonly HANDLER_NAME = "CachingDivisibilityOperatorChainHandler";
  private static readonly HANDLER_VERSION = "1.0.0-CACHING-CHAIN-HANDLER";
  private static readonly HANDLER_PRIORITY = 500;

  private readonly divisibilityCache: Map<string, boolean>;

  constructor(cache?: Map<string, boolean>) {
    super(
      CachingDivisibilityOperatorChainHandlerImpl.HANDLER_NAME,
      CachingDivisibilityOperatorChainHandlerImpl.HANDLER_VERSION,
      CachingDivisibilityOperatorChainHandlerImpl.HANDLER_PRIORITY,
    );
    this.divisibilityCache = cache ?? new Map<string, boolean>();
  }

  override canHandle(_dividend: number, _divisor: number): boolean {
    return true;
  }

  override evaluateDivisibility(dividend: number, divisor: number): boolean {
    this.validateOperands(dividend, divisor);
    const cacheKey = `${dividend}:${divisor}`;
    const cached = this.divisibilityCache.get(cacheKey);
    if (cached !== undefined) {
      return cached;
    }
    if (this.getNextHandler() === null) {
      return false;
    }
    const result = this.proceedToNext(dividend, divisor);
    this.divisibilityCache.set(cacheKey, result);
    return result;
  }

  getCacheSize(): number {
    return this.divisibilityCache.size;
  }

  clearCache(): void {
    this.divisibilityCache.clear();
  }
}
