import { AbstractBaseFizzBuzzStrategy } from "../../abstracts/AbstractBaseFizzBuzzStrategy.js";
import type { IDivisibilityEvaluator } from "../../contracts/IDivisibilityEvaluator.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";

export class FizzBuzzDivisibleByThreeStrategy extends AbstractBaseFizzBuzzStrategy {
  constructor(evaluator: IDivisibilityEvaluator, formatter: IFizzBuzzOutputFormatter) {
    super(evaluator, formatter);
  }

  override getPriority(): number {
    return 50;
  }

  override evaluate(value: number): string | null {
    if (this.isDivisibleBy(value, 3)) {
      return this.formatter.formatFizz();
    }
    return null;
  }
}
