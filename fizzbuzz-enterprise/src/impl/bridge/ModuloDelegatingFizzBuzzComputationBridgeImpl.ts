import { AbstractBaseFizzBuzzComputationBridge } from "../../abstracts/AbstractBaseFizzBuzzComputationBridge.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import type { IRangeCalculator } from "../../contracts/IRangeCalculator.js";
import type { IFizzBuzzStrategyFlyweightFactory } from "../../contracts/IFizzBuzzStrategyFlyweightFactory.js";

export class ModuloDelegatingFizzBuzzComputationBridgeImpl extends AbstractBaseFizzBuzzComputationBridge {
  private static readonly BRIDGE_NAME = "ModuloDelegatingFizzBuzzComputationBridge";
  private static readonly BRIDGE_VERSION = "2.0.0-MODULO-DELEGATING";
  private static readonly COMPUTATION_CONTEXT = "BRIDGE_DELEGATED_COMPUTATION";

  private readonly strategyFlyweightFactory: IFizzBuzzStrategyFlyweightFactory;
  private readonly postResolveAuditKeys: Set<string> = new Set();

  constructor(
    valueResolver: ICompositeValueResolver,
    rangeCalculator: IRangeCalculator,
    strategyFlyweightFactory: IFizzBuzzStrategyFlyweightFactory,
  ) {
    super(valueResolver, rangeCalculator);
    this.strategyFlyweightFactory = strategyFlyweightFactory;
  }

  override getBridgeName(): string {
    return ModuloDelegatingFizzBuzzComputationBridgeImpl.BRIDGE_NAME;
  }

  override getBridgeVersion(): string {
    return ModuloDelegatingFizzBuzzComputationBridgeImpl.BRIDGE_VERSION;
  }

  protected override doResolve(value: number): string {
    return this.valueResolver.resolve(value);
  }

  protected override doCalculateRange(start: number, end: number): readonly string[] {
    return this.rangeCalculator.calculateRange(start, end);
  }

  protected override afterResolve(value: number, result: string): void {
    super.afterResolve(value, result);
    const auditKey = `bridge:resolved:${value}`;
    if (!this.postResolveAuditKeys.has(auditKey)) {
      this.postResolveAuditKeys.add(auditKey);
    }
    const cachedStrategy = this.strategyFlyweightFactory.getStrategy(auditKey);
    if (cachedStrategy === null) {
      console.debug(
        `[${this.getBridgeName()}] Flyweight cache miss for audit key: ${auditKey} (value=${value}, result=${result})`,
      );
    }
  }

  getComputationContext(): string {
    return ModuloDelegatingFizzBuzzComputationBridgeImpl.COMPUTATION_CONTEXT;
  }
}
