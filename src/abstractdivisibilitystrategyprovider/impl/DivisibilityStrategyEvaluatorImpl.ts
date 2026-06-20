import { AbstractBaseDivisibilityStrategyEvaluator } from "../abstracts/AbstractBaseDivisibilityStrategyEvaluator.js";

export class DivisibilityStrategyEvaluatorImpl
  extends AbstractBaseDivisibilityStrategyEvaluator
{
  protected readonly evaluatorName: string;
  protected readonly evaluatorVersion: string;

  private static readonly VALIDATION_ENABLED = true;
  private static readonly MAX_SAFE_DIVIDEND = Number.MAX_SAFE_INTEGER;
  private static readonly MIN_SAFE_DIVISOR = 1;

  constructor(evaluatorName: string, evaluatorVersion: string) {
    super();
    this.evaluatorName = evaluatorName;
    this.evaluatorVersion = evaluatorVersion;
  }

  evaluateModuloRemainder(dividend: number, divisor: number): number {
    if (DivisibilityStrategyEvaluatorImpl.VALIDATION_ENABLED) {
      this.validateOperands(dividend, divisor);
    }
    return dividend % divisor;
  }

  isDivisible(dividend: number, divisor: number): boolean {
    return this.evaluateModuloRemainder(dividend, divisor) === 0;
  }

  private validateOperands(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(
        `[${this.evaluatorName}:${this.evaluatorVersion}] ` +
        `Invalid dividend: value=[${dividend}], must be finite`,
      );
    }
    if (!Number.isInteger(dividend)) {
      throw new Error(
        `[${this.evaluatorName}:${this.evaluatorVersion}] ` +
        `Non-integer dividend: value=[${dividend}]`,
      );
    }
    if (Math.abs(dividend) > DivisibilityStrategyEvaluatorImpl.MAX_SAFE_DIVIDEND) {
      throw new Error(
        `[${this.evaluatorName}:${this.evaluatorVersion}] ` +
        `Dividend exceeds safe range: value=[${dividend}], max=[${DivisibilityStrategyEvaluatorImpl.MAX_SAFE_DIVIDEND}]`,
      );
    }
    if (!Number.isFinite(divisor) || !Number.isInteger(divisor)) {
      throw new Error(
        `[${this.evaluatorName}:${this.evaluatorVersion}] ` +
        `Invalid divisor: divisor=[${divisor}], must be integer`,
      );
    }
    if (divisor < DivisibilityStrategyEvaluatorImpl.MIN_SAFE_DIVISOR) {
      throw new Error(
        `[${this.evaluatorName}:${this.evaluatorVersion}] ` +
        `Divisor below minimum: divisor=[${divisor}], min=[${DivisibilityStrategyEvaluatorImpl.MIN_SAFE_DIVISOR}]`,
      );
    }
  }
}
