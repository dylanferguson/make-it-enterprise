import { AbstractBaseDivisibilityEvaluationStrategyChainLink } from "../../abstracts/AbstractBaseDivisibilityEvaluationStrategyChainLink.js";

export class ValidationDivisibilityEvaluationStrategyChainLinkImpl extends AbstractBaseDivisibilityEvaluationStrategyChainLink {
  private static readonly LINK_NAME = "ValidationDivisibilityEvaluationStrategyChainLink";
  private static readonly LINK_PRIORITY = 500;

  constructor() {
    super(
      ValidationDivisibilityEvaluationStrategyChainLinkImpl.LINK_NAME,
      ValidationDivisibilityEvaluationStrategyChainLinkImpl.LINK_PRIORITY,
    );
  }

  override evaluate(dividend: number, divisor: number): number {
    this.assertOperandsValid(dividend, divisor);
    if (!Number.isInteger(dividend)) {
      throw new Error(
        `[${this.getLinkName()}] Validation failed: dividend must be an integer, received: ${dividend}`,
      );
    }
    if (!Number.isInteger(divisor)) {
      throw new Error(
        `[${this.getLinkName()}] Validation failed: divisor must be an integer, received: ${divisor}`,
      );
    }
    if (divisor < 0) {
      throw new Error(
        `[${this.getLinkName()}] Validation failed: negative divisor not permitted: ${divisor}`,
      );
    }
    if (dividend < 0) {
      throw new Error(
        `[${this.getLinkName()}] Validation failed: negative dividend not permitted: ${dividend}`,
      );
    }
    return this.proceedToNext(dividend, divisor);
  }

  override canHandle(_dividend: number, _divisor: number): boolean {
    return false;
  }
}
