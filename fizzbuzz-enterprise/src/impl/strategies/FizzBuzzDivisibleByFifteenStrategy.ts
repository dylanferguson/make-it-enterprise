import { AbstractBaseFizzBuzzStrategy } from "../../abstracts/AbstractBaseFizzBuzzStrategy.js";
import type { IFizzBuzzVisitor } from "../../contracts/IFizzBuzzVisitor.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";

export class FizzBuzzDivisibleByFifteenStrategy extends AbstractBaseFizzBuzzStrategy {
  constructor(visitor: IFizzBuzzVisitor, formatter: IFizzBuzzOutputFormatter) {
    super(visitor, formatter);
  }

  override getPriority(): number {
    return 100;
  }

  override evaluate(value: number): string | null {
    if (this.isDivisibleBy(value, 15)) {
      return this.formatter.formatFizzBuzz();
    }
    return null;
  }
}
