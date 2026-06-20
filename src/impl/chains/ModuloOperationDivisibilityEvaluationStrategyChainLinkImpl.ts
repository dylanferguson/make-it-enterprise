import { AbstractBaseDivisibilityEvaluationStrategyChainLink } from "../../abstracts/AbstractBaseDivisibilityEvaluationStrategyChainLink.js";

export class ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl extends AbstractBaseDivisibilityEvaluationStrategyChainLink {
  private static readonly LINK_NAME = "ModuloOperationDivisibilityEvaluationStrategyChainLink";
  private static readonly LINK_PRIORITY = 1000;

  constructor() {
    super(ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl.LINK_NAME, ModuloOperationDivisibilityEvaluationStrategyChainLinkImpl.LINK_PRIORITY);
  }

  override evaluate(dividend: number, divisor: number): number {
    this.assertOperandsValid(dividend, divisor);
    if (!this.canHandle(dividend, divisor) && this.hasNextLink()) {
      return this.proceedToNext(dividend, divisor);
    }
    const quotient = Math.trunc(dividend / divisor);
    const remainder = dividend - quotient * divisor;
    const result = Object.is(remainder, -0) ? 0 : remainder;
    return result;
  }

  override canHandle(_dividend: number, _divisor: number): boolean {
    return true;
  }
}
