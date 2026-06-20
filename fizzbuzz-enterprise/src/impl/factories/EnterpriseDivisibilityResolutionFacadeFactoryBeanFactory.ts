import type { IEnterpriseDivisibilityResolutionFacade } from "../../contracts/IEnterpriseDivisibilityResolutionFacade.js";
import { ModuloChainDelegatingEnterpriseDivisibilityResolutionFacadeImpl } from "../resolvers/ModuloChainDelegatingEnterpriseDivisibilityResolutionFacadeImpl.js";
import { CachingDivisibilityResolutionFacadeDecoratorImpl } from "../decorators/CachingDivisibilityResolutionFacadeDecoratorImpl.js";
import { AuditTrailDivisibilityResolutionFacadeDecoratorImpl } from "../decorators/AuditTrailDivisibilityResolutionFacadeDecoratorImpl.js";
import { ValidatingDivisibilityResolutionFacadeDecoratorImpl } from "../decorators/ValidatingDivisibilityResolutionFacadeDecoratorImpl.js";
import { ServiceLocatorFactoryBeanFactory } from "./ServiceLocatorFactoryBean.js";

export const DivisibilityResolutionFacadeConfigurationProfile = {
  STANDARD_WITH_CACHING: "STANDARD_WITH_CACHING",
  FULLY_DECORATED: "FULLY_DECORATED",
  MINIMAL: "MINIMAL",
} as const;

export type DivisibilityResolutionFacadeConfigurationProfile =
  (typeof DivisibilityResolutionFacadeConfigurationProfile)[keyof typeof DivisibilityResolutionFacadeConfigurationProfile];

export class EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-DIVISIBILITY-FACTORY";

  private static instance: IEnterpriseDivisibilityResolutionFacade | null = null;
  private static currentProfile: DivisibilityResolutionFacadeConfigurationProfile =
    DivisibilityResolutionFacadeConfigurationProfile.FULLY_DECORATED;
  private static instanceCount: number = 0;

  static createDivisibilityResolutionFacade(
    profile: DivisibilityResolutionFacadeConfigurationProfile = DivisibilityResolutionFacadeConfigurationProfile.FULLY_DECORATED,
  ): IEnterpriseDivisibilityResolutionFacade {
    EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.instanceCount++;
    if (
      EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.instance === null ||
      EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.currentProfile !== profile
    ) {
      EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.currentProfile = profile;
      EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.instance =
        EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.buildFacadeForProfile(profile);
    }
    return EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.instance;
  }

  static getCurrentProfile(): DivisibilityResolutionFacadeConfigurationProfile {
    return EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.currentProfile;
  }

  static resetDivisibilityResolutionFacade(): void {
    EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.instance = null;
    EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.currentProfile =
      DivisibilityResolutionFacadeConfigurationProfile.FULLY_DECORATED;
  }

  static getFactoryBeanName(): string {
    return EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  static getInstanceCount(): number {
    return EnterpriseDivisibilityResolutionFacadeFactoryBeanFactory.instanceCount;
  }

  private static buildFacadeForProfile(
    profile: DivisibilityResolutionFacadeConfigurationProfile,
  ): IEnterpriseDivisibilityResolutionFacade {
    switch (profile) {
      case DivisibilityResolutionFacadeConfigurationProfile.FULLY_DECORATED: {
        const baseFacade = new ModuloChainDelegatingEnterpriseDivisibilityResolutionFacadeImpl();
        const validatingDecorator =
          new ValidatingDivisibilityResolutionFacadeDecoratorImpl(baseFacade);
        const cachingDecorator =
          new CachingDivisibilityResolutionFacadeDecoratorImpl(validatingDecorator);
        const auditTrailDecorator =
          new AuditTrailDivisibilityResolutionFacadeDecoratorImpl(cachingDecorator);
        return auditTrailDecorator;
      }
      case DivisibilityResolutionFacadeConfigurationProfile.STANDARD_WITH_CACHING: {
        const baseFacade = new ModuloChainDelegatingEnterpriseDivisibilityResolutionFacadeImpl();
        return new CachingDivisibilityResolutionFacadeDecoratorImpl(baseFacade);
      }
      case DivisibilityResolutionFacadeConfigurationProfile.MINIMAL:
      default: {
        return new ModuloChainDelegatingEnterpriseDivisibilityResolutionFacadeImpl();
      }
    }
  }
}
