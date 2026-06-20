import { AbstractBaseFizzBuzzStrategy } from "../../abstracts/AbstractBaseFizzBuzzStrategy.js";
import type { IFizzBuzzVisitor } from "../../contracts/IFizzBuzzVisitor.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";

export class FizzBuzzDivisibleByFiveStrategy extends AbstractBaseFizzBuzzStrategy {
  constructor(visitor: IFizzBuzzVisitor, formatter: IFizzBuzzOutputFormatter) {
    super(visitor, formatter);
  }

  override getPriority(): number {
    return 25;
  }

  override evaluate(value: number): string | null {
    if (this.isDivisibleBy(value, 5)) {
      return this.formatter.formatBuzz();
    }
    return null;
  }
}
