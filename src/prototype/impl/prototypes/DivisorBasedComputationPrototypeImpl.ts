import { AbstractBaseFizzBuzzComputationPrototypeImpl } from "../../abstracts/AbstractBaseFizzBuzzComputationPrototypeImpl.js";
import type { IFizzBuzzComputationPrototype } from "../../contracts/IFizzBuzzComputationPrototype.js";

export class DivisorBasedComputationPrototypeImpl
  extends AbstractBaseFizzBuzzComputationPrototypeImpl
{
  private static readonly PROTOTYPE_NAME = "DivisorBasedComputationPrototype";
  private static readonly PROTOTYPE_IDENTIFIER = "DIVISOR_BASED_COMPUTATION";
  private static readonly PROTOTYPE_VERSION = "1.0.0-PROTOTYPE-DIVISOR";

  constructor() {
    super(
      DivisorBasedComputationPrototypeImpl.PROTOTYPE_NAME,
      DivisorBasedComputationPrototypeImpl.PROTOTYPE_IDENTIFIER,
      DivisorBasedComputationPrototypeImpl.PROTOTYPE_VERSION,
    );
  }

  override clone(): IFizzBuzzComputationPrototype {
    const cloned = new DivisorBasedComputationPrototypeImpl();
    this.copyConfigurationTo(cloned);
    return cloned;
  }
}

