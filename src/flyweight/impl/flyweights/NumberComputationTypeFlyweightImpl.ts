import { AbstractBaseFizzBuzzComputationTypeFlyweightImpl } from "../../abstracts/AbstractBaseFizzBuzzComputationTypeFlyweightImpl.js";

export class NumberComputationTypeFlyweightImpl
  extends AbstractBaseFizzBuzzComputationTypeFlyweightImpl
{
  private static readonly TYPE_NAME = "NumberComputationTypeFlyweight";
  private static readonly TYPE_IDENTIFIER = "NUMBER";
  private static readonly TYPE_VERSION = "1.0.0-FLYWEIGHT-NUMBER";
  private static readonly TYPE_DIVISOR = 1;
  private static readonly TYPE_DISPLAY_LABEL = "Number";
  private static readonly TYPE_ORDINAL_PRIORITY = 3;

  constructor() {
    super(
      NumberComputationTypeFlyweightImpl.TYPE_NAME,
      NumberComputationTypeFlyweightImpl.TYPE_IDENTIFIER,
      NumberComputationTypeFlyweightImpl.TYPE_VERSION,
      NumberComputationTypeFlyweightImpl.TYPE_DIVISOR,
      NumberComputationTypeFlyweightImpl.TYPE_DISPLAY_LABEL,
      NumberComputationTypeFlyweightImpl.TYPE_ORDINAL_PRIORITY,
    );
  }

  override evaluate(value: number): boolean {
    return true;
  }
}

