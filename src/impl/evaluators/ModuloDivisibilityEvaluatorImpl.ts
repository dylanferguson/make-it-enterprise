import { AbstractBaseDivisibilityEvaluator } from "../../abstracts/AbstractBaseDivisibilityEvaluator.js";

export class ModuloDivisibilityEvaluatorImpl extends AbstractBaseDivisibilityEvaluator {
  override isDivisible(dividend: number, divisor: number): boolean {
    this.validateParameters(dividend, divisor);
    return dividend % divisor === 0;
  }
}
