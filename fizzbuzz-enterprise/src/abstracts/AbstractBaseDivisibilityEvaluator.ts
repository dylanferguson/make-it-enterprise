import type { IDivisibilityEvaluator } from "../contracts/IDivisibilityEvaluator.js";

export abstract class AbstractBaseDivisibilityEvaluator implements IDivisibilityEvaluator {
  abstract isDivisible(dividend: number, divisor: number): boolean;

  protected validateParameters(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(`Dividend must be a finite number, received: ${dividend}`);
    }
    if (!Number.isFinite(divisor)) {
      throw new Error(`Divisor must be a finite number, received: ${divisor}`);
    }
    if (divisor === 0) {
      throw new Error("Divisor must not be zero");
    }
  }
}
