import type { IFizzBuzzStrategy } from "../contracts/IFizzBuzzStrategy.js";
import type { IDivisibilityEvaluator } from "../contracts/IDivisibilityEvaluator.js";
import type { IFizzBuzzOutputFormatter } from "../contracts/IFizzBuzzOutputFormatter.js";

export abstract class AbstractBaseFizzBuzzStrategy implements IFizzBuzzStrategy {
  protected readonly evaluator: IDivisibilityEvaluator;
  protected readonly formatter: IFizzBuzzOutputFormatter;

  constructor(evaluator: IDivisibilityEvaluator, formatter: IFizzBuzzOutputFormatter) {
    this.evaluator = evaluator;
    this.formatter = formatter;
  }

  abstract evaluate(value: number): string | null;
  abstract getPriority(): number;

  protected isDivisibleBy(dividend: number, divisor: number): boolean {
    return this.evaluator.isDivisible(dividend, divisor);
  }
}
