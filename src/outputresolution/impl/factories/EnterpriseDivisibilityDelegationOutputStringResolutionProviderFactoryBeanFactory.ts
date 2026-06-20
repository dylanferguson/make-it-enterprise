import type { IEnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider } from "../../../contracts/IEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactory.js";
import { DefaultEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryImpl } from "./DefaultEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryImpl.js";
import { EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory, DivisibilityResolutionFacadeConfigurationProfile } from "../../../impl/factories/EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.js";

export class EnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FACTORY-BEAN-FACTORY";

  private static provider: IEnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider | null = null;
  private static currentProviderProfile: DivisibilityResolutionFacadeConfigurationProfile | null = null;

  static createProvider(
    profile: DivisibilityResolutionFacadeConfigurationProfile = DivisibilityResolutionFacadeConfigurationProfile.FULLY_DECORATED,
  ): IEnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider {
    if (
      EnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryBeanFactory.provider === null ||
      EnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryBeanFactory.currentProviderProfile !== profile
    ) {
      EnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryBeanFactory.currentProviderProfile = profile;
      const factory = new DefaultEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryImpl();
      const divisibilityFacade = EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.createDivisibilityResolutionFacade(profile);
      EnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryBeanFactory.provider = factory.createProvider(divisibilityFacade);
    }
    return EnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryBeanFactory.provider;
  }

  static getCurrentProvider(): IEnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider | null {
    return EnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryBeanFactory.provider;
  }

  static resetProvider(): void {
    EnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryBeanFactory.provider = null;
    EnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryBeanFactory.currentProviderProfile = null;
  }

  static getFactoryBeanName(): string {
    return EnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
