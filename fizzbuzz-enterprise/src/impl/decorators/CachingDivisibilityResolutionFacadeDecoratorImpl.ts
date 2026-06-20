import { AbstractBaseEnterpriseDivisibilityResolutionFacadeDecorator } from "../../abstracts/AbstractBaseEnterpriseDivisibilityResolutionFacadeDecorator.js";
import type { IEnterpriseDivisibilityResolutionFacade } from "../../contracts/IEnterpriseDivisibilityResolutionFacade.js";

export class CachingDivisibilityResolutionFacadeDecoratorImpl
  extends AbstractBaseEnterpriseDivisibilityResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "CachingDivisibilityResolutionFacadeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-DIVISIBILITY-DECORATOR";

  private readonly cache: Map<string, boolean> = new Map();
  private cacheHits: number = 0;
  private cacheMisses: number = 0;

  constructor(wrappedFacade: IEnterpriseDivisibilityResolutionFacade) {
    super(wrappedFacade);
  }

  override isDivisible(dividend: number, divisor: number): boolean {
    const cacheKey = `${dividend}:${divisor}`;
    const cached = this.cache.get(cacheKey);
    if (cached !== undefined) {
      this.cacheHits++;
      return cached;
    }
    this.cacheMisses++;
    const result = this.wrappedFacade.isDivisible(dividend, divisor);
    this.cache.set(cacheKey, result);
    return result;
  }

  override getFacadeName(): string {
    return `${CachingDivisibilityResolutionFacadeDecoratorImpl.DECORATOR_NAME}::${this.wrappedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return CachingDivisibilityResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  override getResolutionStrategyDescription(): string {
    return `Caching wrapper around: ${this.wrappedFacade.getResolutionStrategyDescription()}`;
  }

  override getDecoratorName(): string {
    return CachingDivisibilityResolutionFacadeDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return CachingDivisibilityResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  getCacheHits(): number {
    return this.cacheHits;
  }

  getCacheMisses(): number {
    return this.cacheMisses;
  }

  clearCache(): void {
    this.cache.clear();
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }
}
