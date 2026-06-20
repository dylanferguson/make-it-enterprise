import { AbstractBaseDivisibilityEvaluationSupervisionChainLink } from "../../abstracts/AbstractBaseDivisibilityEvaluationSupervisionChainLink.js";
import type { IDivisibilityEvaluationSupervisionChainLink } from "../../contracts/IDivisibilityEvaluationSupervisionChainLink.js";

export class CachingDivisibilityEvaluationSupervisionChainDecoratorImpl
  extends AbstractBaseDivisibilityEvaluationSupervisionChainLink
  implements IDivisibilityEvaluationSupervisionChainLink
{
  private static readonly LINK_NAME = "CachingDivisibilityEvaluationSupervisionChainDecorator";
  private static readonly LINK_PRIORITY = 50;
  private readonly wrappedLink: IDivisibilityEvaluationSupervisionChainLink;
  private readonly cache: Map<string, boolean> = new Map();
  private static readonly CACHE_MAX_SIZE = 1000;

  constructor(wrappedLink: IDivisibilityEvaluationSupervisionChainLink) {
    super();
    this.wrappedLink = wrappedLink;
  }

  override evaluateDivisibility(dividend: number, divisor: number): boolean {
    const cacheKey = `${dividend}:${divisor}`;
    const cached = this.cache.get(cacheKey);
    if (cached !== undefined) {
      return cached;
    }
    const result = this.wrappedLink.evaluateDivisibility(dividend, divisor);
    if (this.cache.size < CachingDivisibilityEvaluationSupervisionChainDecoratorImpl.CACHE_MAX_SIZE) {
      this.cache.set(cacheKey, result);
    }
    if (!result) {
      return this.proceedToNext(dividend, divisor);
    }
    return result;
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }

  override getLinkName(): string {
    return CachingDivisibilityEvaluationSupervisionChainDecoratorImpl.LINK_NAME;
  }

  override getLinkPriority(): number {
    return CachingDivisibilityEvaluationSupervisionChainDecoratorImpl.LINK_PRIORITY;
  }
}
