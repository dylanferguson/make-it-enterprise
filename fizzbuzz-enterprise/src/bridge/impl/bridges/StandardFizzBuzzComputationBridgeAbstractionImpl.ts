import { AbstractBaseFizzBuzzComputationBridgeAbstractionImpl } from "../../abstracts/AbstractBaseFizzBuzzComputationBridgeAbstractionImpl.js";
import type { IBridgeComputationImplementor } from "../../contracts/IBridgeComputationImplementor.js";

export class StandardFizzBuzzComputationBridgeAbstractionImpl
  extends AbstractBaseFizzBuzzComputationBridgeAbstractionImpl
{
  private static readonly BRIDGE_NAME = "StandardFizzBuzzComputationBridgeAbstraction";
  private static readonly BRIDGE_VERSION = "1.0.0-BRIDGE-STANDARD";

  constructor(implementor: IBridgeComputationImplementor) {
    super(
      StandardFizzBuzzComputationBridgeAbstractionImpl.BRIDGE_NAME,
      StandardFizzBuzzComputationBridgeAbstractionImpl.BRIDGE_VERSION,
      implementor,
    );
  }

  override resolveComputedClassification(value: number, divisor: number): boolean {
    const remainder = this.resolveComputedValue(value, divisor);
    return remainder === 0;
  }
}

