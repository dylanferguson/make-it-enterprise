import { AbstractBaseRemainderComputationStrategyProvider } from "../../abstracts/AbstractBaseRemainderComputationStrategyProvider.js";
import type { IRemainderComputationStrategySelector } from "../../contracts/IRemainderComputationStrategySelector.js";

export class StandardRemainderComputationStrategyProviderImpl
  extends AbstractBaseRemainderComputationStrategyProvider
{
  private static readonly PROVIDER_NAME = "StandardRemainderComputationStrategyProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-STANDARD-REMAINDER-STRATEGY-PROVIDER";

  private evaluationCount: number = 0;

  constructor(strategySelector: IRemainderComputationStrategySelector) {
    super(
      strategySelector,
      StandardRemainderComputationStrategyProviderImpl.PROVIDER_NAME,
      StandardRemainderComputationStrategyProviderImpl.PROVIDER_VERSION,
    );
  }

  override resolveRemainder(dividend: number, divisor: number): number {
    this.evaluationCount++;
    const strategy = this.strategySelector.selectStrategy(divisor);
    return strategy.computeRemainder(dividend, divisor);
  }

  getEvaluationCount(): number {
    return this.evaluationCount;
  }
}
