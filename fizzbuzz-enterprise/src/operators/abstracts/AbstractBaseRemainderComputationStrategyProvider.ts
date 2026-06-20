import type { IRemainderComputationStrategyProvider } from "../contracts/IRemainderComputationStrategyProvider.js";
import type { IRemainderComputationStrategySelector } from "../contracts/IRemainderComputationStrategySelector.js";

export abstract class AbstractBaseRemainderComputationStrategyProvider
  implements IRemainderComputationStrategyProvider
{
  private static readonly DEFAULT_PROVIDER_NAME = "AbstractBaseRemainderComputationStrategyProvider";
  private static readonly DEFAULT_PROVIDER_VERSION = "1.0.0-BASE-REMAINDER-STRATEGY-PROVIDER";

  private readonly providerName: string;
  private readonly providerVersion: string;
  protected readonly strategySelector: IRemainderComputationStrategySelector;

  constructor(
    strategySelector: IRemainderComputationStrategySelector,
    providerName: string = AbstractBaseRemainderComputationStrategyProvider.DEFAULT_PROVIDER_NAME,
    providerVersion: string = AbstractBaseRemainderComputationStrategyProvider.DEFAULT_PROVIDER_VERSION,
  ) {
    this.strategySelector = strategySelector;
    this.providerName = providerName;
    this.providerVersion = providerVersion;
  }

  getProviderName(): string {
    return this.providerName;
  }

  getProviderVersion(): string {
    return this.providerVersion;
  }

  getStrategySelector(): IRemainderComputationStrategySelector {
    return this.strategySelector;
  }

  abstract resolveRemainder(dividend: number, divisor: number): number;

  resolveDivisibility(dividend: number, divisor: number): boolean {
    const remainder = this.resolveRemainder(dividend, divisor);
    return remainder === 0;
  }
}
