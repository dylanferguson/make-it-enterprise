import type { IEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactory, IEnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider } from "../contracts/IEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactory.js";
import type { IEnterpriseDivisibilityResolutionFacade } from "../contracts/IEnterpriseDivisibilityResolutionFacade.js";
import type { IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy } from "../contracts/IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy.js";

export abstract class AbstractBaseEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactory
  implements IEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactory
{
  abstract createProvider(
    divisibilityFacade: IEnterpriseDivisibilityResolutionFacade,
    strategies: readonly IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy[],
  ): IEnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider;

  abstract getFactoryName(): string;
  abstract getFactoryVersion(): string;

  protected createProviderImplementation(
    providerName: string,
    providerVersion: string,
    divisibilityFacade: IEnterpriseDivisibilityResolutionFacade,
    strategies: readonly IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy[],
  ): IEnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider {
    return new DefaultEnterpriseDivisibilityFacadeBackedOutputStringResolutionProviderImpl(
      providerName,
      providerVersion,
      divisibilityFacade,
      strategies,
    );
  }
}

class DefaultEnterpriseDivisibilityFacadeBackedOutputStringResolutionProviderImpl
  implements IEnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider
{
  private readonly providerName: string;
  private readonly providerVersion: string;
  private readonly divisibilityFacade: IEnterpriseDivisibilityResolutionFacade;
  private readonly strategies: readonly IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy[];

  constructor(
    providerName: string,
    providerVersion: string,
    divisibilityFacade: IEnterpriseDivisibilityResolutionFacade,
    strategies: readonly IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy[],
  ) {
    this.providerName = providerName;
    this.providerVersion = providerVersion;
    this.divisibilityFacade = divisibilityFacade;
    this.strategies = [...strategies].sort((a, b) => a.getDelegationStrategyPriority() - b.getDelegationStrategyPriority());
  }

  getProviderName(): string { return this.providerName; }
  getProviderVersion(): string { return this.providerVersion; }

  resolveOutputString(value: number): string {
    for (const strategy of this.strategies) {
      if (strategy.canResolve(value, this.divisibilityFacade)) {
        return strategy.resolve(value, this.divisibilityFacade);
      }
    }
    return value.toString();
  }

  getActiveStrategyIdentifier(value: number): string | null {
    for (const strategy of this.strategies) {
      if (strategy.canResolve(value, this.divisibilityFacade)) {
        return strategy.getResolvedIdentifier();
      }
    }
    return null;
  }
}
