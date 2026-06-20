import type { IModuloEvaluationStrategy } from "../contracts/IModuloEvaluationStrategy.js";

export abstract class AbstractBaseModuloEvaluationStrategy
  implements IModuloEvaluationStrategy
{
  abstract evaluateModulo(dividend: number, divisor: number): number;
  abstract getEvaluationStrategyName(): string;
  abstract getEvaluationStrategyVersion(): string;
  abstract supportsDivisor(divisor: number): boolean;

  protected validateOperands(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(
        `[${this.getEvaluationStrategyName()}] Dividend must be finite, received: ${dividend}`,
      );
    }
    if (!Number.isFinite(divisor)) {
      throw new Error(
        `[${this.getEvaluationStrategyName()}] Divisor must be finite, received: ${divisor}`,
      );
    }
    if (divisor === 0) {
      throw new Error(
        `[${this.getEvaluationStrategyName()}] Division by zero is not permitted`,
      );
    }
  }

  protected truncateToInteger(value: number): number {
    return Math.trunc(value);
  }

  protected templateMethodEvaluate(dividend: number, divisor: number): number {
    this.validateOperands(dividend, divisor);
    const truncatedDividend = this.truncateToInteger(dividend);
    const truncatedDivisor = this.truncateToInteger(divisor);
    const rawResult = this.doEvaluate(truncatedDividend, truncatedDivisor);
    return this.postProcessResult(rawResult, dividend, divisor);
  }

  protected abstract doEvaluate(
    truncatedDividend: number,
    truncatedDivisor: number,
  ): number;

  protected postProcessResult(
    result: number,
    _originalDividend: number,
    _originalDivisor: number,
  ): number {
    return result;
  }
}
