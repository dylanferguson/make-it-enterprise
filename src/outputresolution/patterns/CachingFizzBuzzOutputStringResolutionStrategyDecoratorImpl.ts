import { AbstractBaseFizzBuzzOutputStringResolutionStrategy } from "../abstracts/AbstractBaseFizzBuzzOutputStringResolutionStrategy.js";
import { AbstractBaseFizzBuzzOutputStringResolutionStrategyDecorator } from "./AbstractBaseFizzBuzzOutputStringResolutionStrategyDecorator.js";

const CACHE_MAP = new Map<number, string>();

export class CachingFizzBuzzOutputStringResolutionStrategyDecoratorImpl
  extends AbstractBaseFizzBuzzOutputStringResolutionStrategyDecorator
{
  private static readonly DECORATOR_NAME = "CachingFizzBuzzOutputStringResolutionStrategyDecorator";
  private static readonly DECORATOR_VERSION = "1.0.0-CACHING-OUTPUT-DECORATOR";
  private static readonly DECORATOR_PRIORITY = -50;
  private static readonly RESOLVED_IDENTIFIER = "CACHING_OUTPUT_STRATEGY_DECORATOR";
  private static readonly MAX_CACHE_SIZE = 1000;

  constructor(decoratedStrategy: AbstractBaseFizzBuzzOutputStringResolutionStrategy) {
    super(
      decoratedStrategy,
      CachingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.DECORATOR_NAME,
      CachingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.DECORATOR_VERSION,
      CachingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.DECORATOR_PRIORITY,
      CachingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.RESOLVED_IDENTIFIER,
    );
  }

  override canResolve(value: number): boolean {
    if (CACHE_MAP.has(value)) {
      return true;
    }
    return this.decoratedStrategy.canResolve(value);
  }

  override resolve(value: number): string {
    const cached = CACHE_MAP.get(value);
    if (cached !== undefined) {
      return cached;
    }
    const resolved = this.decoratedStrategy.resolve(value);
    if (CACHE_MAP.size < CachingFizzBuzzOutputStringResolutionStrategyDecoratorImpl.MAX_CACHE_SIZE) {
      CACHE_MAP.set(value, resolved);
    }
    return resolved;
  }

  static clearCache(): void {
    CACHE_MAP.clear();
  }

  static getCacheSize(): number {
    return CACHE_MAP.size;
  }
}
