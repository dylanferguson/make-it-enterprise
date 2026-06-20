import { AbstractBaseFizzBuzzComputationTypeFlyweightImpl } from "../../abstracts/AbstractBaseFizzBuzzComputationTypeFlyweightImpl.js";

export class BuzzComputationTypeFlyweightImpl
  extends AbstractBaseFizzBuzzComputationTypeFlyweightImpl
{
  private static readonly TYPE_NAME = "BuzzComputationTypeFlyweight";
  private static readonly TYPE_IDENTIFIER = "BUZZ";
  private static readonly TYPE_VERSION = "1.0.0-FLYWEIGHT-BUZZ";
  private static readonly TYPE_DIVISOR = 5;
  private static readonly TYPE_DISPLAY_LABEL = "Buzz";
  private static readonly TYPE_ORDINAL_PRIORITY = 2;

  constructor() {
    super(
      BuzzComputationTypeFlyweightImpl.TYPE_NAME,
      BuzzComputationTypeFlyweightImpl.TYPE_IDENTIFIER,
      BuzzComputationTypeFlyweightImpl.TYPE_VERSION,
      BuzzComputationTypeFlyweightImpl.TYPE_DIVISOR,
      BuzzComputationTypeFlyweightImpl.TYPE_DISPLAY_LABEL,
      BuzzComputationTypeFlyweightImpl.TYPE_ORDINAL_PRIORITY,
    );
  }

  override evaluate(value: number): boolean {
    return value % BuzzComputationTypeFlyweightImpl.TYPE_DIVISOR === 0;
  }
}

