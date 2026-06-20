import type { IDivisibilityValidationEnforcementGate } from "./IDivisibilityValidationEnforcementGate.js";
import type { IDivisibilityValidationEnforcementSpecificationProvider } from "./IDivisibilityValidationEnforcementSpecificationProvider.js";
import type { IValidationEnforcementMetricsCollector } from "./IValidationEnforcementMetricsCollector.js";

export interface IDivisibilityValidationEnforcementGateFactoryBean {
  createGate(): IDivisibilityValidationEnforcementGate;
  setSpecificationProvider(
    provider: IDivisibilityValidationEnforcementSpecificationProvider,
  ): void;
  setMetricsCollector(
    collector: IValidationEnforcementMetricsCollector,
  ): void;
  setDecoratorChainEnabled(enabled: boolean): void;
  setValidationProfile(profile: string): void;
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
  getValidationProfile(): string;
}
