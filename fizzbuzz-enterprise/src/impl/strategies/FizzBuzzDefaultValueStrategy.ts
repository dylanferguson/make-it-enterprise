import { AbstractBaseFizzBuzzStrategy } from "../../abstracts/AbstractBaseFizzBuzzStrategy.js";
import type { IFizzBuzzVisitor } from "../../contracts/IFizzBuzzVisitor.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";

export class FizzBuzzDefaultValueStrategy extends AbstractBaseFizzBuzzStrategy {
  constructor(visitor: IFizzBuzzVisitor, formatter: IFizzBuzzOutputFormatter) {
    super(visitor, formatter);
  }

  override getPriority(): number {
    return 0;
  }

  override evaluate(value: number): string | null {
    return this.formatter.formatDefault(value);
  }
}
