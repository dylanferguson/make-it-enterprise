import { AbstractBaseDivisibilityEvaluator } from "../../abstracts/AbstractBaseDivisibilityEvaluator.js";
import type { IModuloArithmeticStrategyProvider } from "../../contracts/IModuloArithmeticStrategyProvider.js";

export class ModuloDivisibilityEvaluatorImpl extends AbstractBaseDivisibilityEvaluator {
  private readonly strategyProvider: IModuloArithmeticStrategyProvider;

  constructor(strategyProvider: IModuloArithmeticStrategyProvider) {
    super();
    this.strategyProvider = strategyProvider;
  }

  override isDivisible(dividend: number, divisor: number): boolean {
    this.validateParameters(dividend, divisor);
    const strategy = this.strategyProvider.getStrategyForDivisor(divisor);
    return strategy.computeModulo(dividend, divisor) === 0;
  }
}
