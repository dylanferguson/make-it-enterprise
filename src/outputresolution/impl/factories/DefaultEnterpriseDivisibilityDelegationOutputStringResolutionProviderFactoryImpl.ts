import { AbstractBaseEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactory } from "../../../abstracts/AbstractBaseEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactory.js";
import type { IEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactory, IEnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider } from "../../../contracts/IEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactory.js";
import type { IEnterpriseDivisibilityResolutionFacade } from "../../../contracts/IEnterpriseDivisibilityResolutionFacade.js";
import type { IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy } from "../../../contracts/IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy.js";
import { DivisibleByEnterpriseFacadeDelegatingFizzBuzzOutputStringResolutionStrategyImpl } from "../strategies/DivisibleByEnterpriseFacadeDelegatingFizzBuzzOutputStringResolutionStrategyImpl.js";
import { DivisibleByEnterpriseFacadeDelegatingFizzOutputStringResolutionStrategyImpl } from "../strategies/DivisibleByEnterpriseFacadeDelegatingFizzOutputStringResolutionStrategyImpl.js";
import { DivisibleByEnterpriseFacadeDelegatingBuzzOutputStringResolutionStrategyImpl } from "../strategies/DivisibleByEnterpriseFacadeDelegatingBuzzOutputStringResolutionStrategyImpl.js";
import { DivisibleByEnterpriseFacadeDelegatingNumberOutputStringResolutionStrategyImpl } from "../strategies/DivisibleByEnterpriseFacadeDelegatingNumberOutputStringResolutionStrategyImpl.js";

export class DefaultEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryImpl
  extends AbstractBaseEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactory
  implements IEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactory
{
  private static readonly FACTORY_NAME = "DefaultEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactory";
  private static readonly FACTORY_VERSION = "1.0.0-DELEGATION-PROVIDER-FACTORY";
  private static readonly PROVIDER_NAME = "EnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-ENTERPRISE-FACADE-BACKED";

  private static readonly defaultStrategies: readonly IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy[] = [
    new DivisibleByEnterpriseFacadeDelegatingFizzBuzzOutputStringResolutionStrategyImpl(),
    new DivisibleByEnterpriseFacadeDelegatingFizzOutputStringResolutionStrategyImpl(),
    new DivisibleByEnterpriseFacadeDelegatingBuzzOutputStringResolutionStrategyImpl(),
    new DivisibleByEnterpriseFacadeDelegatingNumberOutputStringResolutionStrategyImpl(),
  ];

  override createProvider(
    divisibilityFacade: IEnterpriseDivisibilityResolutionFacade,
    strategies?: readonly IEnterpriseFizzBuzzOutputStringResolutionDivisibilityDelegationStrategy[],
  ): IEnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider {
    const effectiveStrategies = strategies ?? DefaultEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryImpl.defaultStrategies;
    return this.createProviderImplementation(
      DefaultEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryImpl.PROVIDER_NAME,
      DefaultEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryImpl.PROVIDER_VERSION,
      divisibilityFacade,
      effectiveStrategies,
    );
  }

  override getFactoryName(): string {
    return DefaultEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryImpl.FACTORY_NAME;
  }

  override getFactoryVersion(): string {
    return DefaultEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryImpl.FACTORY_VERSION;
  }
}
