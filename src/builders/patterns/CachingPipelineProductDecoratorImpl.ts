import type { IFizzBuzzComputationPipelineProduct } from "../contracts/IFizzBuzzComputationPipelineBuilder.js";
import type { IFizzBuzzRangeIterator } from "../../iterators/contracts/IFizzBuzzRangeIterator.js";

export class CachingPipelineProductDecoratorImpl implements IFizzBuzzComputationPipelineProduct {
  private static readonly DECORATOR_NAME = "CachingPipelineProductDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-CACHING-DECORATOR";
  private readonly wrappedProduct: IFizzBuzzComputationPipelineProduct;
  private readonly cache: Map<number, string> = new Map();
  private cacheHitCount: number = 0;
  private cacheMissCount: number = 0;

  constructor(wrappedProduct: IFizzBuzzComputationPipelineProduct) {
    this.wrappedProduct = wrappedProduct;
  }

  getProductName(): string {
    return `${CachingPipelineProductDecoratorImpl.DECORATOR_NAME}:${this.wrappedProduct.getProductName()}`;
  }

  getProductVersion(): string {
    return `${CachingPipelineProductDecoratorImpl.DECORATOR_VERSION}:${this.wrappedProduct.getProductVersion()}`;
  }

  getPipelineConfigurationProfile(): string {
    return this.wrappedProduct.getPipelineConfigurationProfile();
  }

  getUnderlyingIterator(): IFizzBuzzRangeIterator | null {
    return this.wrappedProduct.getUnderlyingIterator();
  }

  resolveSingleValue(value: number): string {
    const cached = this.cache.get(value);
    if (cached !== undefined) {
      this.cacheHitCount++;
      return cached;
    }
    this.cacheMissCount++;
    const result = this.wrappedProduct.resolveSingleValue(value);
    this.cache.set(value, result);
    return result;
  }

  resolveRange(start: number, end: number): readonly string[] {
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(this.resolveSingleValue(i));
    }
    return results;
  }

  getDiagnosticSummary(): Record<string, string> {
    return {
      ...this.wrappedProduct.getDiagnosticSummary(),
      cachingDecoratorVersion: CachingPipelineProductDecoratorImpl.DECORATOR_VERSION,
      cacheSize: String(this.cache.size),
      cacheHitCount: String(this.cacheHitCount),
      cacheMissCount: String(this.cacheMissCount),
      cacheHitRatio: this.cacheHitCount + this.cacheMissCount > 0
        ? String((this.cacheHitCount / (this.cacheHitCount + this.cacheMissCount) * 100).toFixed(2)) + "%"
        : "0%",
    };
  }

  invalidateCache(): void {
    this.cache.clear();
  }
}
