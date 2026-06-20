import { AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl } from "../abstract/AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseFizzBuzzResultFormattingVisitor } from "../contracts/IEnterpriseFizzBuzzResultFormattingVisitor.js";

export class StandardEnterpriseFizzBuzzResultFormatterBridgeImpl
  extends AbstractBaseEnterpriseFizzBuzzResultFormatterBridgeImpl
{
  private static readonly BRIDGE_NAME = "StandardEnterpriseFizzBuzzResultFormatterBridge";
  private static readonly BRIDGE_VERSION = "1.0.0-FORMATTER-BRIDGE-STANDARD";
  private static readonly BRIDGE_IMPLEMENTATION_TYPE = "STANDARD_FORMATTER_BRIDGE";

  private resolutionCount: number = 0;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    formattingVisitors: readonly IEnterpriseFizzBuzzResultFormattingVisitor[],
  ) {
    super(wrappedFacade, formattingVisitors);
  }

  override resolveValue(value: number): string {
    this.resolutionCount++;
    const context = this.buildBridgeResolutionContext(value);
    const innerResult = this.wrappedFacade.resolveValue(value);
    const formatted = this.applyFormattingVisitors(innerResult, value);
    console.debug(
      `[${StandardEnterpriseFizzBuzzResultFormatterBridgeImpl.BRIDGE_NAME} v${StandardEnterpriseFizzBuzzResultFormatterBridgeImpl.BRIDGE_VERSION}] ` +
      `Bridge resolving value [${value}]: ` +
      `context=[${context}], ` +
      `resolutionCount=[${this.resolutionCount}], ` +
      `innerResult=[${innerResult}], ` +
      `formattedResult=[${formatted}], ` +
      `bridgeType=[${StandardEnterpriseFizzBuzzResultFormatterBridgeImpl.BRIDGE_IMPLEMENTATION_TYPE}], ` +
      `visitorCount=[${this.formattingVisitors.length}], ` +
      `cacheHitRate=[${this.computeCacheHitRate()}]`,
    );
    return formatted;
  }

  override resolveRange(start: number, end: number): readonly string[] {
    if (end < start) {
      throw new Error(
        `[${StandardEnterpriseFizzBuzzResultFormatterBridgeImpl.BRIDGE_NAME}] ` +
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
    return `${StandardEnterpriseFizzBuzzResultFormatterBridgeImpl.BRIDGE_NAME}::${this.wrappedFacade.getFacadeName()}`;
  }

  override getFacadeVersion(): string {
    return StandardEnterpriseFizzBuzzResultFormatterBridgeImpl.BRIDGE_VERSION;
  }

  override getBridgeName(): string {
    return StandardEnterpriseFizzBuzzResultFormatterBridgeImpl.BRIDGE_NAME;
  }

  override getBridgeVersion(): string {
    return StandardEnterpriseFizzBuzzResultFormatterBridgeImpl.BRIDGE_VERSION;
  }

  override getBridgeImplementationType(): string {
    return StandardEnterpriseFizzBuzzResultFormatterBridgeImpl.BRIDGE_IMPLEMENTATION_TYPE;
  }

  private computeCacheHitRate(): string {
    const total = this.flyweightCacheHitCount + this.flyweightCacheMissCount;
    if (total === 0) return "N/A";
    return `${((this.flyweightCacheHitCount / total) * 100).toFixed(2)}%`;
  }
}
