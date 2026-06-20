import { AbstractBaseFizzBuzzComputationTypeFlyweightImpl } from "../../abstracts/AbstractBaseFizzBuzzComputationTypeFlyweightImpl.js";

export class FizzBuzzComputationTypeFlyweightImpl
  extends AbstractBaseFizzBuzzComputationTypeFlyweightImpl
{
  private static readonly TYPE_NAME = "FizzBuzzComputationTypeFlyweight";
  private static readonly TYPE_IDENTIFIER = "FIZZBUZZ_COMPOSITE";
  private static readonly TYPE_VERSION = "1.0.0-FLYWEIGHT-FIZZBUZZ";
  private static readonly TYPE_DIVISOR = 15;
  private static readonly TYPE_DISPLAY_LABEL = "FizzBuzz";
  private static readonly TYPE_ORDINAL_PRIORITY = 0;

  constructor() {
    super(
      FizzBuzzComputationTypeFlyweightImpl.TYPE_NAME,
      FizzBuzzComputationTypeFlyweightImpl.TYPE_IDENTIFIER,
      FizzBuzzComputationTypeFlyweightImpl.TYPE_VERSION,
      FizzBuzzComputationTypeFlyweightImpl.TYPE_DIVISOR,
      FizzBuzzComputationTypeFlyweightImpl.TYPE_DISPLAY_LABEL,
      FizzBuzzComputationTypeFlyweightImpl.TYPE_ORDINAL_PRIORITY,
    );
  }

  override evaluate(value: number): boolean {
    return value % FizzBuzzComputationTypeFlyweightImpl.TYPE_DIVISOR === 0;
  }
}

