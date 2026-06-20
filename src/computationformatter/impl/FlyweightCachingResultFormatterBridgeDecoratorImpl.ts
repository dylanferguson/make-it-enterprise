import { AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl } from "../abstract/AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseFizzBuzzResultFormattingVisitor } from "../contracts/IEnterpriseFizzBuzzResultFormattingVisitor.js";

const FLYWEIGHT_CACHE_CAPACITY = 256;

export class FlyweightCachingResultFormatterBridgeDecoratorImpl
  extends AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl
{
  private static readonly DECORATOR_NAME = "FlyweightCachingResultFormatterBridgeDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-FLYWEIGHT-BRIDGE-DECORATOR";
  private static readonly DECORATOR_IMPLEMENTATION_TYPE = "FLYWEIGHT_CACHING_FORMATTER_BRIDGE_DECORATOR";

  private readonly decoratedBridge: AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl;
  private readonly flyweightCache: Map<string, string> = new Map();
  private cacheEvictionCount: number = 0;

  constructor(
    decoratedBridge: AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl,
  ) {
    super(decoratedBridge.getWrappedFacade(), []);
    this.decoratedBridge = decoratedBridge;
  }

  override resolveValue(value: number): string {
    const cacheKey = `fb:flyweight:${value}`;
    const cached = this.flyweightCache.get(cacheKey);
    if (cached !== undefined) {
      this.flyweightCacheHitCount++;
      console.debug(
        `[${FlyweightCachingResultFormatterBridgeDecoratorImpl.DECORATOR_NAME} v${FlyweightCachingResultFormatterBridgeDecoratorImpl.DECORATOR_VERSION}] ` +
        `Flyweight cache HIT for key=[${cacheKey}]: cachedResult=[${cached}], ` +
        `cacheSize=[${this.flyweightCache.size}], ` +
        `evictions=[${this.cacheEvictionCount}]`,
      );
      return cached;
    }
    this.flyweightCacheMissCount++;
    const result = this.decoratedBridge.resolveValue(value);
    if (this.flyweightCache.size >= FLYWEIGHT_CACHE_CAPACITY) {
      const firstKey = this.flyweightCache.keys().next().value;
      if (firstKey !== undefined) {
        this.flyweightCache.delete(firstKey);
        this.cacheEvictionCount++;
      }
    }
    this.flyweightCache.set(cacheKey, result);
    console.debug(
      `[${FlyweightCachingResultFormatterBridgeDecoratorImpl.DECORATOR_NAME} v${FlyweightCachingResultFormatterBridgeDecoratorImpl.DECORATOR_VERSION}] ` +
      `Flyweight cache MISS for key=[${cacheKey}]: computedResult=[${result}], ` +
      `cacheSize=[${this.flyweightCache.size}], ` +
      `evictions=[${this.cacheEvictionCount}]`,
    );
    return result;
  }

  override resolveRange(start: number, end: number): readonly string[] {
    if (end < start) {
      throw new Error(
        `[${FlyweightCachingResultFormatterBridgeDecoratorImpl.DECORATOR_NAME}] ` +
        `Range end [${end}] must be >= start [${start}]`,
      );
    }
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(this.resolveValue(i));
    }
    return results;
  }

  override getFacadeName(): string {
    return `${FlyweightCachingResultFormatterBridgeDecoratorImpl.DECORATOR_NAME}::${this.decoratedBridge.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return FlyweightCachingResultFormatterBridgeDecoratorImpl.DECORATOR_VERSION;
  }

  override getBridgeName(): string {
    return FlyweightCachingResultFormatterBridgeDecoratorImpl.DECORATOR_NAME;
  }

  override getBridgeVersion(): string {
    return FlyweightCachingResultFormatterBridgeDecoratorImpl.DECORATOR_VERSION;
  }

  override getBridgeImplementationType(): string {
    return FlyweightCachingResultFormatterBridgeDecoratorImpl.DECORATOR_IMPLEMENTATION_TYPE;
  }

  getFlyweightCacheSize(): number {
    return this.flyweightCache.size;
  }

  getFlyweightCacheEvictionCount(): number {
    return this.cacheEvictionCount;
  }

  getWrappedBridge(): AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl {
    return this.decoratedBridge;
  }
}
