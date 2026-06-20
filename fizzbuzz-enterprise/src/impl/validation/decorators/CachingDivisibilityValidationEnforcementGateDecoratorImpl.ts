import type { IDivisibilityValidationEnforcementGate } from "../../../contracts/IDivisibilityValidationEnforcementGate.js";
import { AbstractBaseDivisibilityValidationEnforcementGateDecorator } from "../../../abstracts/AbstractBaseDivisibilityValidationEnforcementGateDecorator.js";

export class CachingDivisibilityValidationEnforcementGateDecoratorImpl
  extends AbstractBaseDivisibilityValidationEnforcementGateDecorator
{
  private static readonly DECORATOR_NAME = "CachingDivisibilityValidationEnforcementGateDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-CACHING-GATE-DECORATOR";
  private static readonly DECORATOR_ORDER = 20;
  private static readonly CACHE_MAX_SIZE = 10000;

  private readonly validationCache: Map<string, boolean>;

  constructor(decoratedGate: IDivisibilityValidationEnforcementGate) {
    super(decoratedGate);
    this.validationCache = new Map<string, boolean>();
  }

  override enforceDivisibilityValidation(
    value: number,
    divisor: number,
    validationContext: string,
  ): boolean {
    const cacheKey = this.buildCacheKey(value, divisor, validationContext);
    const cachedResult = this.validationCache.get(cacheKey);
    if (cachedResult !== undefined) {
      return cachedResult;
    }
    const result = this.decoratedGate.enforceDivisibilityValidation(
      value,
      divisor,
      validationContext,
    );
    if (this.validationCache.size < CachingDivisibilityValidationEnforcementGateDecoratorImpl.CACHE_MAX_SIZE) {
      this.validationCache.set(cacheKey, result);
    }
    return result;
  }

  override getGateName(): string {
    return `${CachingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_NAME}:wraps:${this.decoratedGate.getGateName()}`;
  }

  override getGateVersion(): string {
    return CachingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_VERSION;
  }

  override getGateImplementationType(): string {
    return `CACHED:${this.decoratedGate.getGateImplementationType()}`;
  }

  override getDecoratorName(): string {
    return CachingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_NAME;
  }

  override getDecoratorVersion(): string {
    return CachingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_VERSION;
  }

  override getDecoratorOrder(): number {
    return CachingDivisibilityValidationEnforcementGateDecoratorImpl.DECORATOR_ORDER;
  }

  clearCache(): void {
    this.validationCache.clear();
  }

  getCacheSize(): number {
    return this.validationCache.size;
  }

  private buildCacheKey(value: number, divisor: number, context: string): string {
    return `${Math.trunc(value)}:${Math.trunc(divisor)}:${context}`;
  }
}
