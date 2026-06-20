import { AbstractBaseModuloEvaluationStrategy } from "../../abstracts/AbstractBaseModuloEvaluationStrategy.js";

export class StandardRemainderModuloEvaluationStrategyImpl extends AbstractBaseModuloEvaluationStrategy {
  private static readonly STRATEGY_VERSION = "1.1.0-RELEASE";
  private static readonly STRATEGY_NAME = "StandardRemainderModuloEvaluationStrategy";

  override evaluateModulo(dividend: number, divisor: number): number {
    return this.templateMethodEvaluate(dividend, divisor);
  }

  override getEvaluationStrategyName(): string {
    return StandardRemainderModuloEvaluationStrategyImpl.STRATEGY_NAME;
  }

  override getEvaluationStrategyVersion(): string {
    return StandardRemainderModuloEvaluationStrategyImpl.STRATEGY_VERSION;
  }

  override supportsDivisor(divisor: number): boolean {
    return divisor > 0 && Number.isInteger(divisor);
  }

  protected override doEvaluate(
    truncatedDividend: number,
    truncatedDivisor: number,
  ): number {
    return truncatedDividend % truncatedDivisor;
  }

  protected override postProcessResult(
    result: number,
    _originalDividend: number,
    _originalDivisor: number,
  ): number {
    if (Object.is(result, -0)) {
      return 0;
    }
    return result;
  }
}
