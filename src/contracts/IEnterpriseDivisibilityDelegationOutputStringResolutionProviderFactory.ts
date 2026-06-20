import type { IEnterpriseDivisibilityResolutionFacade } from "./IEnterpriseDivisibilityResolutionFacade.js";
import type { IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy } from "./IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy.js";

export interface IEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactory {
  createProvider(
    divisibilityFacade: IEnterpriseDivisibilityResolutionFacade,
    strategies: readonly IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy[],
  ): IEnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider;
  getFactoryName(): string;
  getFactoryVersion(): string;
}

export interface IEnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider {
  getProviderName(): string;
  getProviderVersion(): string;
  resolveOutputString(value: number): string;
  getActiveStrategyIdentifier(value: number): string | null;
}
