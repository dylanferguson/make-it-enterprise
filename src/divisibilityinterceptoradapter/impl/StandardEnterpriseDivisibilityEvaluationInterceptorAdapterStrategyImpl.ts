import { AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy } from "../abstracts/AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy.js";

export class StandardEnterpriseDivisibilityEvaluationInterceptorAdapterStrategyImpl
  extends AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy
{
  private static readonly STRATEGY_NAME_PREFIX = "StandardDivisibilityEvaluationInterceptorAdapterStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-DIV-INTERCEPT-STRATEGY";

  protected readonly strategyName: string;
  protected readonly strategyVersion: string;
  protected readonly strategyDivisor: number;

  constructor(divisor: number) {
    super();
    this.strategyDivisor = divisor;
    this.strategyName = `${StandardEnterpriseDivisibilityEvaluationInterceptorAdapterStrategyImpl.STRATEGY_NAME_PREFIX}[divisor=${divisor}]`;
    this.strategyVersion = `${StandardEnterpriseDivisibilityEvaluationInterceptorAdapterStrategyImpl.STRATEGY_VERSION}-D${divisor}`;
  }

  resolveInterceptedRemainder(dividend: number, divisor: number, context: string | null): number {
    this.assertValidOperands(dividend, divisor);
    let result = dividend % divisor;
    if (Object.is(result, -0)) {
      result = 0;
    }
    if (result < 0) {
      result = Math.abs(result);
    }
    return result;
  }
}
