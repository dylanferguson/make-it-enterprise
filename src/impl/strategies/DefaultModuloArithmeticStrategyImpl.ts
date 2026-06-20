import { AbstractBaseModuloArithmeticStrategy } from "../../abstracts/AbstractBaseModuloArithmeticStrategy.js";

export class DefaultModuloArithmeticStrategyImpl extends AbstractBaseModuloArithmeticStrategy {
  override computeModulo(dividend: number, divisor: number): number {
    this.validateOperands(dividend, divisor);
    const truncatedDividend = this.truncateToInteger(dividend);
    const truncatedDivisor = this.truncateToInteger(divisor);
    return truncatedDividend % truncatedDivisor;
  }

  override getArithmeticStrategyName(): string {
    return "DefaultModuloArithmeticStrategy";
  }
}
