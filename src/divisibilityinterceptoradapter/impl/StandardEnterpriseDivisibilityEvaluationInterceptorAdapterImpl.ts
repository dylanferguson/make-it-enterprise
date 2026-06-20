import { AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapter } from "../abstracts/AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapter.js";
import type { IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy } from "../contracts/IEnterpriseDivisibilityEvaluationInterceptorAdapterStrategy.js";

export class StandardEnterpriseDivisibilityEvaluationInterceptorAdapterImpl
  extends AbstractBaseEnterpriseDivisibilityEvaluationInterceptorAdapter
{
  private static readonly ADAPTER_NAME = "StandardEnterpriseDivisibilityEvaluationInterceptorAdapter";
  private static readonly ADAPTER_VERSION = "1.0.0-DIV-INTERCEPT-ADAPTER";

  protected readonly adapterName = StandardEnterpriseDivisibilityEvaluationInterceptorAdapterImpl.ADAPTER_NAME;
  protected readonly adapterVersion = StandardEnterpriseDivisibilityEvaluationInterceptorAdapterImpl.ADAPTER_VERSION;

  interceptEvaluation(value: number, divisor: number, context: string | null): number {
    this.validateDivisor(divisor);
    this.invocationCount++;
    const activeContext = context ?? this.buildAdapterContext(value, divisor);
    const strategy = this.resolveAdapterStrategy(divisor);
    if (strategy !== null && strategy.isStrategyEnabled()) {
      return strategy.resolveInterceptedRemainder(value, divisor, activeContext);
    }
    return value % divisor;
  }
}
