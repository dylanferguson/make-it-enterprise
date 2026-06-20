import { AbstractBaseFizzBuzzComputationBridge } from "../../abstracts/AbstractBaseFizzBuzzComputationBridge.js";
import type { ICompositeValueResolver } from "../../contracts/ICompositeValueResolver.js";
import type { IRangeCalculator } from "../../contracts/IRangeCalculator.js";

export class StandardFizzBuzzComputationBridgeImpl extends AbstractBaseFizzBuzzComputationBridge {
  private static readonly BRIDGE_NAME = "StandardFizzBuzzComputationBridge";
  private static readonly BRIDGE_VERSION = "1.0.0-ENTERPRISE";

  constructor(valueResolver: ICompositeValueResolver, rangeCalculator: IRangeCalculator) {
    super(valueResolver, rangeCalculator);
  }

  override getBridgeName(): string {
    return StandardFizzBuzzComputationBridgeImpl.BRIDGE_NAME;
  }

  override getBridgeVersion(): string {
    return StandardFizzBuzzComputationBridgeImpl.BRIDGE_VERSION;
  }

  protected override doResolve(value: number): string {
    return this.valueResolver.resolve(value);
  }

  protected override doCalculateRange(start: number, end: number): readonly string[] {
    return this.rangeCalculator.calculateRange(start, end);
  }
}
