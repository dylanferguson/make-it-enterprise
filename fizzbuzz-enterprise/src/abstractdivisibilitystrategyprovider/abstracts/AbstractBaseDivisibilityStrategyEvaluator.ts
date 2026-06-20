import type { IDivisibilityStrategyEvaluator } from "../contracts/IDivisibilityStrategyEvaluator.js";

export abstract class AbstractBaseDivisibilityStrategyEvaluator
  implements IDivisibilityStrategyEvaluator
{
  protected abstract readonly evaluatorName: string;
  protected abstract readonly evaluatorVersion: string;

  abstract evaluateModuloRemainder(dividend: number, divisor: number): number;
  abstract isDivisible(dividend: number, divisor: number): boolean;

  getEvaluatorName(): string {
    return this.evaluatorName;
  }

  getEvaluatorVersion(): string {
    return this.evaluatorVersion;
  }
}
