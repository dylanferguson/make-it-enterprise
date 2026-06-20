import { AbstractBaseModuloEvaluationStrategy } from "../../abstracts/AbstractBaseModuloEvaluationStrategy.js";
import type { IDivisibilityEvaluationStrategyChain } from "../../contracts/IDivisibilityEvaluationStrategyChain.js";

export class ChainBasedModuloEvaluationStrategyImpl extends AbstractBaseModuloEvaluationStrategy {
  private static readonly STRATEGY_NAME = "ChainBasedModuloEvaluationStrategy";
  private static readonly STRATEGY_VERSION = "2.0.0-ENTERPRISE";

  private readonly evaluationChain: IDivisibilityEvaluationStrategyChain;

  constructor(evaluationChain: IDivisibilityEvaluationStrategyChain) {
    super();
    this.evaluationChain = evaluationChain;
  }

  override evaluateModulo(dividend: number, divisor: number): number {
    return this.templateMethodEvaluate(dividend, divisor);
  }

  override getEvaluationStrategyName(): string {
    return ChainBasedModuloEvaluationStrategyImpl.STRATEGY_NAME;
  }

  override getEvaluationStrategyVersion(): string {
    return ChainBasedModuloEvaluationStrategyImpl.STRATEGY_VERSION;
  }

  override supportsDivisor(divisor: number): boolean {
    return divisor > 0 && Number.isInteger(divisor);
  }

  getEvaluationChain(): IDivisibilityEvaluationStrategyChain {
    return this.evaluationChain;
  }

  protected override doEvaluate(truncatedDividend: number, truncatedDivisor: number): number {
    return this.evaluationChain.evaluate(truncatedDividend, truncatedDivisor);
  }

  protected override postProcessResult(result: number, _originalDividend: number, _originalDivisor: number): number {
    if (Object.is(result, -0)) {
      return 0;
    }
    return result;
  }
}
