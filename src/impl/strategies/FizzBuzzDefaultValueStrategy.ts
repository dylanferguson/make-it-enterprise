import { AbstractBaseFizzBuzzStrategy } from "../../abstracts/AbstractBaseFizzBuzzStrategy.js";
import type { IDivisibilityEvaluator } from "../../contracts/IDivisibilityEvaluator.js";
import type { IFizzBuzzOutputFormatter } from "../../contracts/IFizzBuzzOutputFormatter.js";

export class FizzBuzzDefaultValueStrategy extends AbstractBaseFizzBuzzStrategy {
  constructor(evaluator: IDivisibilityEvaluator, formatter: IFizzBuzzOutputFormatter) {
    super(evaluator, formatter);
  }

  override getPriority(): number {
    return 0;
  }

  override evaluate(value: number): string | null {
    return this.formatter.formatDefault(value);
  }
}
