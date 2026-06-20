import { AbstractBaseRemainderComputationStrategy } from "../../abstracts/AbstractBaseRemainderComputationStrategy.js";

export class TruncatedDivisionRemainderComputationStrategyImpl
  extends AbstractBaseRemainderComputationStrategy
{
  private static readonly STRATEGY_NAME = "TruncatedDivisionRemainderComputationStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-TRUNCATED-DIVISION-STRATEGY";

  constructor() {
    super(
      TruncatedDivisionRemainderComputationStrategyImpl.STRATEGY_NAME,
      TruncatedDivisionRemainderComputationStrategyImpl.STRATEGY_VERSION,
    );
  }

  override computeRemainder(dividend: number, divisor: number): number {
    this.validateOperands(dividend, divisor);
    const truncatedDividend = Math.trunc(dividend);
    const truncatedDivisor = Math.trunc(divisor);
    const quotient = Math.trunc(truncatedDividend / truncatedDivisor);
    return truncatedDividend - quotient * truncatedDivisor;
  }
}
