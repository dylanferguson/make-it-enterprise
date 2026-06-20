import { AbstractBaseModularArithmeticDivisibilityResolutionMediatorProvider } from "../abstracts/AbstractBaseModularArithmeticDivisibilityResolutionMediatorProvider.js";
import type { IModularArithmeticDivisibilityResolutionStrategyMediator } from "../contracts/IModularArithmeticDivisibilityResolutionStrategyMediator.js";

export class ServiceLocatorManagedModularArithmeticDivisibilityResolutionMediatorProviderImpl
  extends AbstractBaseModularArithmeticDivisibilityResolutionMediatorProvider
{
  private static readonly PROVIDER_NAME = "ServiceLocatorManagedModularArithmeticDivisibilityResolutionMediatorProvider";
  private static readonly PROVIDER_VERSION = "1.0.0-SERVICE-LOCATOR-MANAGED";

  constructor() {
    super(
      ServiceLocatorManagedModularArithmeticDivisibilityResolutionMediatorProviderImpl.PROVIDER_NAME,
      ServiceLocatorManagedModularArithmeticDivisibilityResolutionMediatorProviderImpl.PROVIDER_VERSION,
    );
  }

  override resolveMediator(divisor: number): IModularArithmeticDivisibilityResolutionStrategyMediator {
    const registry = this.getRegistryForLookup();
    const factoryBean = registry.resolveMediatorFactoryBean(divisor);
    if (factoryBean === null) {
      throw new Error(
        `[${this.getProviderName()}] No mediator factory bean registered for divisor: ${divisor}`,
      );
    }
    return factoryBean.createMediator();
  }
}
