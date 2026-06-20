import { AbstractBaseFizzBuzzComputationTypeFlyweightImpl } from "../../abstracts/AbstractBaseFizzBuzzComputationTypeFlyweightImpl.js";

export class FizzComputationTypeFlyweightImpl
  extends AbstractBaseFizzBuzzComputationTypeFlyweightImpl
{
  private static readonly TYPE_NAME = "FizzComputationTypeFlyweight";
  private static readonly TYPE_IDENTIFIER = "FIZZ";
  private static readonly TYPE_VERSION = "1.0.0-FLYWEIGHT-FIZZ";
  private static readonly TYPE_DIVISOR = 3;
  private static readonly TYPE_DISPLAY_LABEL = "Fizz";
  private static readonly TYPE_ORDINAL_PRIORITY = 1;

  constructor() {
    super(
      FizzComputationTypeFlyweightImpl.TYPE_NAME,
      FizzComputationTypeFlyweightImpl.TYPE_IDENTIFIER,
      FizzComputationTypeFlyweightImpl.TYPE_VERSION,
      FizzComputationTypeFlyweightImpl.TYPE_DIVISOR,
      FizzComputationTypeFlyweightImpl.TYPE_DISPLAY_LABEL,
      FizzComputationTypeFlyweightImpl.TYPE_ORDINAL_PRIORITY,
    );
  }

  override evaluate(value: number): boolean {
    return value % FizzComputationTypeFlyweightImpl.TYPE_DIVISOR === 0;
  }
}

