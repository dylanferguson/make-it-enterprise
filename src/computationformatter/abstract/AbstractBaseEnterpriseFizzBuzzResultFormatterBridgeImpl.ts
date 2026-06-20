import type { IEnterpriseFizzBuzzResultFormatterBridge } from "../contracts/IEnterpriseFizzBuzzResultFormatterBridge.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseFizzBuzzResultFormattingVisitor } from "../contracts/IEnterpriseFizzBuzzResultFormattingVisitor.js";

export abstract class AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl
  implements IEnterpriseFizzBuzzResultFormatterBridge
{
  protected static readonly BRIDGE_RESOLUTION_CONTEXT_PREFIX = "format:bridge:res";
  protected static readonly DEFAULT_FLYWEIGHT_CACHE_CAPACITY = 256;

  protected readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  protected readonly formattingVisitors: readonly IEnterpriseFizzBuzzResultFormattingVisitor[];
  protected flyweightCacheHitCount: number = 0;
  protected flyweightCacheMissCount: number = 0;
  protected bridgeEnabled: boolean = true;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    formattingVisitors: readonly IEnterpriseFizzBuzzResultFormattingVisitor[],
  ) {
    this.wrappedFacade = wrappedFacade;
    this.formattingVisitors = formattingVisitors;
  }

  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract getBridgeName(): string;
  abstract getBridgeVersion(): string;
  abstract getBridgeImplementationType(): string;

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.wrappedFacade;
  }

  getFlyweightCacheHitCount(): number {
    return this.flyweightCacheHitCount;
  }

  getFlyweightCacheMissCount(): number {
    return this.flyweightCacheMissCount;
  }

  isFormatterBridgeEnabled(): boolean {
    return this.bridgeEnabled;
  }

  protected applyFormattingVisitors(input: string, value: number): string {
    let result = input;
    for (const visitor of this.formattingVisitors) {
      result = visitor.visitFormattedResult(result, value, this.getBridgeName());
    }
    return result;
  }

  protected buildBridgeResolutionContext(value: number): string {
    return `${AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl.BRIDGE_RESOLUTION_CONTEXT_PREFIX}:${value}:${Date.now()}:${Math.random().toString(36).substring(2, 10)}`;
  }
}
