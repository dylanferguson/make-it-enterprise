import { AbstractBaseModuloArithmeticStrategy } from "../../abstracts/AbstractBaseModuloArithmeticStrategy.js";
import type { IModuloEvaluationStrategyProvider } from "../../contracts/IModuloEvaluationStrategyProvider.js";

export class DefaultModuloArithmeticStrategyImpl extends AbstractBaseModuloArithmeticStrategy {
  private readonly evaluationStrategyProvider: IModuloEvaluationStrategyProvider;

  constructor(evaluationStrategyProvider: IModuloEvaluationStrategyProvider) {
    super();
    this.evaluationStrategyProvider = evaluationStrategyProvider;
  }

  override computeModulo(dividend: number, divisor: number): number {
    this.validateOperands(dividend, divisor);
    const truncatedDividend = this.truncateToInteger(dividend);
    const truncatedDivisor = this.truncateToInteger(divisor);
    const evaluationStrategy =
      this.evaluationStrategyProvider.resolveStrategy(divisor);
    return evaluationStrategy.evaluateModulo(
      truncatedDividend,
      truncatedDivisor,
    );
  }

  override getArithmeticStrategyName(): string {
    return "DefaultModuloArithmeticStrategy";
  }
}
