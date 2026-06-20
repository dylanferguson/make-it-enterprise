import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IValidationAwareResolutionFacadeDecorator } from "../../contracts/IValidationAwareResolutionFacadeDecorator.js";
import type { IDivisibilityValidationEnforcementGate } from "../../contracts/IDivisibilityValidationEnforcementGate.js";
import { ValidationAwareResolutionFacadeDecoratorImpl } from "../validation/ValidationAwareResolutionFacadeDecoratorImpl.js";
import { DivisibilityValidationEnforcementGateFactoryBeanFactory } from "../validation/DivisibilityValidationEnforcementGateFactoryBeanFactory.js";

export const ValidationAwareDecoratorConfigurationProfile = {
  ENABLED_STRICT: "ENABLED_STRICT",
  ENABLED_PERFORMANCE: "ENABLED_PERFORMANCE",
  DISABLED: "DISABLED",
} as const;

export type ValidationAwareDecoratorConfigurationProfile =
  (typeof ValidationAwareDecoratorConfigurationProfile)[keyof typeof ValidationAwareDecoratorConfigurationProfile];

export class ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory {
  private static readonly FACTORY_NAME = "ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory";
  private static readonly FACTORY_VERSION = "1.0.0-VALIDATION-AWARE-DECORATOR-FACTORY";

  private static instance: IValidationAwareResolutionFacadeDecorator | null = null;
  private static currentProfile: ValidationAwareDecoratorConfigurationProfile = "ENABLED_STRICT";

  static createDecorator(
    decoratedFacade: IFizzBuzzSingleValueResolutionFacade,
    profile: ValidationAwareDecoratorConfigurationProfile = "ENABLED_STRICT",
  ): IValidationAwareResolutionFacadeDecorator {
    if (
      ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.instance === null ||
      ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.currentProfile !== profile
    ) {
      ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.currentProfile = profile;

      const gate: IDivisibilityValidationEnforcementGate =
        DivisibilityValidationEnforcementGateFactoryBeanFactory.createValidationGate("STANDARD_STRICT");

      const validationEnabled = profile !== "DISABLED";

      ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.instance =
        new ValidationAwareResolutionFacadeDecoratorImpl(
          decoratedFacade,
          gate,
          validationEnabled,
        );

      console.debug(
        `[${ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_NAME} v${ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_VERSION}] ` +
        `Validation-aware facade decorator created: profile=${profile}, ` +
        `validationEnabled=${validationEnabled}, ` +
        `gateType=${gate.getGateImplementationType()}`,
      );
    }
    return ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.instance;
  }

  static getDecorator(): IValidationAwareResolutionFacadeDecorator | null {
    return ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.instance;
  }

  static getCurrentProfile(): ValidationAwareDecoratorConfigurationProfile {
    return ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.currentProfile;
  }

  static resetDecorator(): void {
    ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.instance = null;
    ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.currentProfile = "ENABLED_STRICT";
  }

  static getFactoryName(): string {
    return ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_NAME;
  }

  static getFactoryVersion(): string {
    return ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.FACTORY_VERSION;
  }

  static isDecoratorInitialized(): boolean {
    return ValidationAwareResolutionFacadeDecoratorFactoryBeanFactory.instance !== null;
  }
}
