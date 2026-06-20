import { AbstractBaseRemainderOperatorDelegationServiceDecorator } from "../../abstracts/AbstractBaseRemainderOperatorDelegationServiceDecorator.js";
import type { IRemainderOperatorDelegationService } from "../../contracts/IRemainderOperatorDelegationService.js";

export class CachingRemainderOperatorDelegationServiceDecoratorImpl
  extends AbstractBaseRemainderOperatorDelegationServiceDecorator
{
  private static readonly DECORATOR_NAME = "CachingRemainderOperatorDelegationServiceDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-RELEASE";
  private readonly cache: Map<string, number> = new Map();
  private hitCount: number = 0;
  private missCount: number = 0;

  constructor(decoratedService: IRemainderOperatorDelegationService) {
    super(decoratedService);
  }

  override computeRemainder(dividend: number, divisor: number): number {
    const cacheKey = `${dividend}:${divisor}`;
    const cached = this.cache.get(cacheKey);
    if (cached !== undefined) {
      this.hitCount++;
      return cached;
    }
    this.missCount++;
    const result = this.decoratedService.computeRemainder(dividend, divisor);
    this.cache.set(cacheKey, result);
    return result;
  }

  override getDecoratorName(): string {
    return CachingRemainderOperatorDelegationServiceDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return CachingRemainderOperatorDelegationServiceDecoratorImpl.DECORATOR_VERSION;
  }

  getCacheHitCount(): number {
    return this.hitCount;
  }

  getCacheMissCount(): number {
    return this.missCount;
  }

  getCacheSize(): number {
    return this.cache.size;
  }

  clearCache(): void {
    this.cache.clear();
    this.hitCount = 0;
    this.missCount = 0;
  }
}
