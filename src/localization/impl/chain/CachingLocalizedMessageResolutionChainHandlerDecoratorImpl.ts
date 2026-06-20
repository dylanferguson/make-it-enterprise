import { AbstractBaseLocalizedMessageResolutionChainHandler } from "../../abstracts/AbstractBaseLocalizedMessageResolutionChainHandler.js";
import { FizzBuzzOutputMessageCode } from "../messagecodes/FizzBuzzOutputMessageCodeImpl.js";

export class CachingLocalizedMessageResolutionChainHandlerDecoratorImpl
  extends AbstractBaseLocalizedMessageResolutionChainHandler
{
  private static readonly HANDLER_NAME = "CachingLocalizedMessageResolutionChainHandlerDecorator";
  private static readonly HANDLER_VERSION = "1.0.0-CACHING-MESSAGE-CHAIN-DECORATOR";

  private readonly cache: Map<string, string>;
  private cacheHits: number;
  private cacheMisses: number;

  constructor() {
    super(
      CachingLocalizedMessageResolutionChainHandlerDecoratorImpl.HANDLER_NAME,
      CachingLocalizedMessageResolutionChainHandlerDecoratorImpl.HANDLER_VERSION,
    );
    this.cache = new Map();
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }

  override handleMessageResolution(
    messageCode: FizzBuzzOutputMessageCode,
    args: readonly string[],
    locale: string,
  ): string {
    this.validateResolutionInputs(messageCode, locale);
    const cacheKey = this.buildCacheKey(messageCode, args, locale);
    const cached = this.cache.get(cacheKey);
    if (cached !== undefined) {
      this.cacheHits++;
      return cached;
    }
    this.cacheMisses++;
    const result = this.proceedToNext(messageCode, args, locale);
    this.cache.set(cacheKey, result);
    return result;
  }

  protected override getUnresolvedFallback(messageCode: FizzBuzzOutputMessageCode): string {
    return FizzBuzzOutputMessageCode.getDefaultMessage(messageCode);
  }

  clearCache(): void {
    this.cache.clear();
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }

  getCacheSize(): number {
    return this.cache.size;
  }

  getCacheHitCount(): number {
    return this.cacheHits;
  }

  getCacheMissCount(): number {
    return this.cacheMisses;
  }

  getCacheHitRatio(): number {
    const total = this.cacheHits + this.cacheMisses;
    if (total === 0) return 0;
    return this.cacheHits / total;
  }

  private buildCacheKey(
    messageCode: FizzBuzzOutputMessageCode,
    args: readonly string[],
    locale: string,
  ): string {
    return `${locale}:${messageCode.getResourceBundleKey()}:${args.join(",")}`;
  }
}
