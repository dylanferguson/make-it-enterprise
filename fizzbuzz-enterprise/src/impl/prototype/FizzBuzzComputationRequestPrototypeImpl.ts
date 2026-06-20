import { AbstractBaseComputationRequestPrototype } from "../../abstracts/AbstractBaseComputationRequestPrototype.js";
import type { IComputationRequestPrototype } from "../../contracts/IComputationRequestPrototype.js";

const FIZZBUZZ_PROTOTYPE_NAME = "FizzBuzzComputationRequestPrototype";
const FIZZBUZZ_PROTOTYPE_VERSION = "1.0.0-PROTOTYPE";
const FIZZBUZZ_PROTOTYPE_TYPE = "FIZZBUZZ_SINGLE_VALUE_RESOLUTION";

export class FizzBuzzComputationRequestPrototypeImpl
  extends AbstractBaseComputationRequestPrototype<string>
{
  protected readonly prototypeName: string = FIZZBUZZ_PROTOTYPE_NAME;
  protected readonly prototypeVersion: string = FIZZBUZZ_PROTOTYPE_VERSION;
  protected readonly prototypeType: string = FIZZBUZZ_PROTOTYPE_TYPE;

  constructor(parameterValue: number, prototypeId?: string) {
    super(parameterValue, prototypeId);
  }

  override clone(): IComputationRequestPrototype<string> {
    const cloned = new FizzBuzzComputationRequestPrototypeImpl(this.parameterValue);
    this.assignBaseState(cloned);
    return cloned;
  }
}
