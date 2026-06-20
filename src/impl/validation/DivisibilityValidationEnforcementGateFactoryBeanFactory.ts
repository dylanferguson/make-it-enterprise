import type { IDivisibilityValidationEnforcementGateFactoryBean } from "../../contracts/IDivisibilityValidationEnforcementGateFactoryBean.js";
import type { IDivisibilityValidationEnforcementGate } from "../../contracts/IDivisibilityValidationEnforcementGate.js";
import { DefaultDivisibilityValidationEnforcementGateFactoryBeanImpl } from "./DefaultDivisibilityValidationEnforcementGateFactoryBeanImpl.js";

export const DivisibilityValidationEnforcementGateConfigurationProfile = {
  STANDARD_STRICT: "STANDARD_STRICT",
  PERFORMANCE_OPTIMIZED: "PERFORMANCE_OPTIMIZED",
  AUDIT_FOCUSED: "AUDIT_FOCUSED",
  STRICTEST_ENFORCEMENT: "STRICTEST_ENFORCEMENT",
} as const;

export type DivisibilityValidationEnforcementGateConfigurationProfile =
  (typeof DivisibilityValidationEnforcementGateConfigurationProfile)[keyof typeof DivisibilityValidationEnforcementGateConfigurationProfile];

export class DivisibilityValidationEnforcementGateFactoryBeanFactory {
  private static readonly FACTORY_NAME = "DivisibilityValidationEnforcementGateFactoryBeanFactory";
  private static readonly FACTORY_VERSION = "1.0.0-GATE-FACTORY-FACTORY";

  private static instance: IDivisibilityValidationEnforcementGate | null = null;
  private static factoryBean: IDivisibilityValidationEnforcementGateFactoryBean | null = null;
  private static currentProfile: DivisibilityValidationEnforcementGateConfigurationProfile = "STANDARD_STRICT";

  static createValidationGate(
    profile: DivisibilityValidationEnforcementGateConfigurationProfile = "STANDARD_STRICT",
  ): IDivisibilityValidationEnforcementGate {
    if (
      DivisibilityValidationEnforcementGateFactoryBeanFactory.instance === null ||
      DivisibilityValidationEnforcementGateFactoryBeanFactory.currentProfile !== profile
    ) {
      DivisibilityValidationEnforcementGateFactoryBeanFactory.currentProfile = profile;
      const factoryBean = new DefaultDivisibilityValidationEnforcementGateFactoryBeanImpl(profile);
      DivisibilityValidationEnforcementGateFactoryBeanFactory.instance = factoryBean.createGate();
      DivisibilityValidationEnforcementGateFactoryBeanFactory.factoryBean = factoryBean;

      console.debug(
        `[${DivisibilityValidationEnforcementGateFactoryBeanFactory.FACTORY_NAME} v${DivisibilityValidationEnforcementGateFactoryBeanFactory.FACTORY_VERSION}] ` +
        `Validation gate initialized: profile=${profile}, ` +
        `gateType=${factoryBean.createGate().getGateImplementationType()}`,
      );
    }
    return DivisibilityValidationEnforcementGateFactoryBeanFactory.instance;
  }

  static getValidationGate(): IDivisibilityValidationEnforcementGate | null {
    return DivisibilityValidationEnforcementGateFactoryBeanFactory.instance;
  }

  static getFactoryBean(): IDivisibilityValidationEnforcementGateFactoryBean | null {
    return DivisibilityValidationEnforcementGateFactoryBeanFactory.factoryBean;
  }

  static getCurrentProfile(): DivisibilityValidationEnforcementGateConfigurationProfile {
    return DivisibilityValidationEnforcementGateFactoryBeanFactory.currentProfile;
  }

  static resetValidationGate(): void {
    DivisibilityValidationEnforcementGateFactoryBeanFactory.instance = null;
    DivisibilityValidationEnforcementGateFactoryBeanFactory.factoryBean = null;
    DivisibilityValidationEnforcementGateFactoryBeanFactory.currentProfile = "STANDARD_STRICT";
  }

  static getFactoryName(): string {
    return DivisibilityValidationEnforcementGateFactoryBeanFactory.FACTORY_NAME;
  }

  static getFactoryVersion(): string {
    return DivisibilityValidationEnforcementGateFactoryBeanFactory.FACTORY_VERSION;
  }
}
