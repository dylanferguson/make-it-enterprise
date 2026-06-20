import { AbstractBaseDivisibleByFallbackComputationStrategyChainHandler } from "../../abstracts/AbstractBaseDivisibleByFallbackComputationStrategyChainHandler.js";

export class ClassicArithmeticDivisibleByFallbackComputationStrategyChainHandlerImpl
  extends AbstractBaseDivisibleByFallbackComputationStrategyChainHandler
{
  private static readonly HANDLER_NAME = "ClassicArithmeticDivisibleByFallbackComputationStrategyChainHandler";
  private static readonly HANDLER_PRIORITY = -100;

  override handleFallbackComputation(dividend: number, divisor: number, computationContext: string): number {
    this.validateOperands(dividend, divisor);
    const truncatedDividend = Math.trunc(dividend);
    const truncatedDivisor = Math.trunc(divisor);
    const quotient = Math.trunc(truncatedDividend / truncatedDivisor);
    const remainder = truncatedDividend - quotient * truncatedDivisor;
    if (Object.is(remainder, -0)) {
      return 0;
    }
    if (remainder < 0) {
      return Math.abs(remainder);
    }
    return remainder;
  }

  override getHandlerName(): string {
    return ClassicArithmeticDivisibleByFallbackComputationStrategyChainHandlerImpl.HANDLER_NAME;
  }

  override getHandlerPriority(): number {
    return ClassicArithmeticDivisibleByFallbackComputationStrategyChainHandlerImpl.HANDLER_PRIORITY;
  }

  override canHandle(_dividend: number, _divisor: number): boolean {
    return true;
  }
}
