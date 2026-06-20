import type { IDivisibilityValidationEnforcementGateFactoryBean } from "../contracts/IDivisibilityValidationEnforcementGateFactoryBean.js";
import type { IDivisibilityValidationEnforcementGate } from "../contracts/IDivisibilityValidationEnforcementGate.js";
import type { IDivisibilityValidationEnforcementSpecificationProvider } from "../contracts/IDivisibilityValidationEnforcementSpecificationProvider.js";
import type { IValidationEnforcementMetricsCollector } from "../contracts/IValidationEnforcementMetricsCollector.js";

export abstract class AbstractBaseDivisibilityValidationEnforcementGateFactoryBean
  implements IDivisibilityValidationEnforcementGateFactoryBean
{
  protected static readonly FACTORY_BEAN_FRAMEWORK_VERSION = "1.0.0-GATE-FACTORY-BEAN-FRAMEWORK";
  protected static readonly DEFAULT_VALIDATION_PROFILE = "STANDARD_STRICT";

  protected specificationProvider: IDivisibilityValidationEnforcementSpecificationProvider | null = null;
  protected metricsCollector: IValidationEnforcementMetricsCollector | null = null;
  protected decoratorChainEnabled: boolean = true;
  protected validationProfile: string;

  constructor(validationProfile: string = AbstractBaseDivisibilityValidationEnforcementGateFactoryBean.DEFAULT_VALIDATION_PROFILE) {
    this.validationProfile = validationProfile;
  }

  abstract getFactoryBeanName(): string;
  abstract getFactoryBeanVersion(): string;
  abstract createGate(): IDivisibilityValidationEnforcementGate;

  setSpecificationProvider(
    provider: IDivisibilityValidationEnforcementSpecificationProvider,
  ): void {
    this.specificationProvider = provider;
  }

  setMetricsCollector(
    collector: IValidationEnforcementMetricsCollector,
  ): void {
    this.metricsCollector = collector;
  }

  setDecoratorChainEnabled(enabled: boolean): void {
    this.decoratorChainEnabled = enabled;
  }

  setValidationProfile(profile: string): void {
    this.validationProfile = profile;
  }

  getValidationProfile(): string {
    return this.validationProfile;
  }

  protected getFactoryBeanFrameworkVersion(): string {
    return AbstractBaseDivisibilityValidationEnforcementGateFactoryBean.FACTORY_BEAN_FRAMEWORK_VERSION;
  }

  protected getDefaultValidationProfile(): string {
    return AbstractBaseDivisibilityValidationEnforcementGateFactoryBean.DEFAULT_VALIDATION_PROFILE;
  }
}
