import type { IEnterpriseModuloArithmeticVisitor } from "../../contracts/IEnterpriseModuloArithmeticVisitor.js";
import { AbstractBaseEnterpriseModuloArithmeticVisitor } from "../../abstracts/AbstractBaseEnterpriseModuloArithmeticVisitor.js";

export class CachingModuloArithmeticVisitorDecoratorImpl
  extends AbstractBaseEnterpriseModuloArithmeticVisitor
{
  private static readonly DECORATOR_NAME = "CachingModuloArithmeticVisitorDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-CACHING-VISITOR-DECORATOR";
  private static readonly MAX_CACHE_SIZE = 1000;

  private readonly delegate: IEnterpriseModuloArithmeticVisitor;
  private readonly cache: Map<string, number>;
  private cacheHits: number = 0;
  private cacheMisses: number = 0;

  constructor(delegate: IEnterpriseModuloArithmeticVisitor) {
    super();
    this.delegate = delegate;
    this.cache = new Map<string, number>();
  }

  override getVisitorName(): string {
    return CachingModuloArithmeticVisitorDecoratorImpl.DECORATOR_NAME;
  }

  override getVisitorVersion(): string {
    return CachingModuloArithmeticVisitorDecoratorImpl.DECORATOR_VERSION;
  }

  override visitModuloEvaluation(
    dividend: number,
    divisor: number,
    evaluationContext: string | null,
  ): number {
    const cacheKey = `${dividend}:${divisor}:${evaluationContext ?? "default"}`;
    const cachedValue = this.cache.get(cacheKey);
    if (cachedValue !== undefined) {
      this.cacheHits++;
      return cachedValue;
    }
    this.cacheMisses++;
    const result = this.delegate.visitModuloEvaluation(dividend, divisor, evaluationContext);
    if (this.cache.size < CachingModuloArithmeticVisitorDecoratorImpl.MAX_CACHE_SIZE) {
      this.cache.set(cacheKey, result);
    }
    return result;
  }

  getCacheHitCount(): number {
    return this.cacheHits;
  }

  getCacheMissCount(): number {
    return this.cacheMisses;
  }

  getCacheHitRatio(): number {
    const total = this.cacheHits + this.cacheMisses;
    return total === 0 ? 0 : this.cacheHits / total;
  }

  getDelegateVisitorName(): string {
    return this.delegate.getVisitorName();
  }

  evictCache(): void {
    this.cache.clear();
  }
}
