import { AbstractBaseModuloEvaluationStrategy } from "../../abstracts/AbstractBaseModuloEvaluationStrategy.js";

export class ParanoiacPrimeModuloEvaluationStrategyImpl extends AbstractBaseModuloEvaluationStrategy {
  private static readonly STRATEGY_VERSION = "1.0.0-PARANOIAC-PRIME";
  private static readonly STRATEGY_NAME = "ParanoiacPrimeModuloEvaluationStrategy";

  override evaluateModulo(dividend: number, divisor: number): number {
    return this.templateMethodEvaluate(dividend, divisor);
  }

  override getEvaluationStrategyName(): string {
    return ParanoiacPrimeModuloEvaluationStrategyImpl.STRATEGY_NAME;
  }

  override getEvaluationStrategyVersion(): string {
    return ParanoiacPrimeModuloEvaluationStrategyImpl.STRATEGY_VERSION;
  }

  override supportsDivisor(divisor: number): boolean {
    return divisor > 0 && Number.isInteger(divisor) && this.isPrime(divisor);
  }

  protected override doEvaluate(
    truncatedDividend: number,
    truncatedDivisor: number,
  ): number {
    const quotient = Math.floor(truncatedDividend / truncatedDivisor);
    return truncatedDividend - quotient * truncatedDivisor;
  }

  protected override postProcessResult(
    result: number,
    _originalDividend: number,
    _originalDivisor: number,
  ): number {
    if (Object.is(result, -0)) {
      return 0;
    }
    return Math.abs(result);
  }

  private isPrime(value: number): boolean {
    if (value <= 1) return false;
    if (value <= 3) return true;
    if (value % 2 === 0 || value % 3 === 0) return false;
    for (let i = 5; i * i <= value; i += 6) {
      if (value % i === 0 || value % (i + 2) === 0) return false;
    }
    return true;
  }
}
