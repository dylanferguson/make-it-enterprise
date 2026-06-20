import { FizzBuzzSingleValueResolutionFacadeImpl } from "../facades/FizzBuzzSingleValueResolutionFacadeImpl.js";
import { FizzBuzzComputationRequestBuilderImpl } from "../builders/FizzBuzzComputationRequestBuilderImpl.js";
import { FizzBuzzComputationTemplateFactoryBean } from "./FizzBuzzComputationTemplateFactoryBean.js";
import { FizzBuzzCommandInfrastructureFacadeImpl } from "../services/FizzBuzzCommandInfrastructureFacadeImpl.js";
import { FizzBuzzValueResolutionCommandImpl } from "../commands/FizzBuzzValueResolutionCommandImpl.js";
import { FizzBuzzEnterpriseServiceFactoryBeanFactory } from "../../enterprise/FizzBuzzEnterpriseService.js";
import { FizzBuzzEnterpriseServiceFacadeImpl } from "../delegates/FizzBuzzEnterpriseServiceFacadeImpl.js";
import { FizzBuzzClientSideServiceDelegateImpl } from "../delegates/FizzBuzzClientSideServiceDelegateImpl.js";
import { BusinessDelegateLookupServiceFactoryBean } from "../delegates/BusinessDelegateLookupServiceFactoryBean.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IFizzBuzzResolutionFacadeFactoryBean } from "../../contracts/IFizzBuzzResolutionFacadeFactoryBean.js";
import type { IFizzBuzzServiceDelegate } from "../../contracts/IFizzBuzzServiceDelegate.js";
import type { IBusinessDelegateLookupService } from "../../contracts/IBusinessDelegateLookupService.js";
import type { IFizzBuzzCommandInfrastructureFacade } from "../../contracts/IFizzBuzzCommandInfrastructureFacade.js";
import type { IFizzBuzzComputationRequestBuilder } from "../../contracts/IFizzBuzzComputationRequestBuilder.js";

export const FizzBuzzResolutionFacadeConfigurationProfile = {
  STANDARD: "STANDARD",
  HIGH_THROUGHPUT: "HIGH_THROUGHPUT",
  OBSERVABILITY_FOCUSED: "OBSERVABILITY_FOCUSED",
  STRICT_VALIDATION: "STRICT_VALIDATION",
} as const;

export type FizzBuzzResolutionFacadeConfigurationProfile =
  (typeof FizzBuzzResolutionFacadeConfigurationProfile)[keyof typeof FizzBuzzResolutionFacadeConfigurationProfile];

const DELEGATE_JNDI_NAME = "java:comp/env/fizzbuzz/DefaultEnterpriseServiceDelegate";

export class FizzBuzzResolutionFacadeFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzResolutionFacadeFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-RESOLUTION-FACADE-FACTORY";

  private static instance: IFizzBuzzSingleValueResolutionFacade | null = null;
  private static factoryBean: IFizzBuzzResolutionFacadeFactoryBean | null = null;
  private static currentProfile: FizzBuzzResolutionFacadeConfigurationProfile = "STANDARD";

  static createResolutionFacade(
    profile: FizzBuzzResolutionFacadeConfigurationProfile = "STANDARD",
  ): IFizzBuzzSingleValueResolutionFacade {
    if (
      FizzBuzzResolutionFacadeFactoryBeanFactory.instance === null ||
      FizzBuzzResolutionFacadeFactoryBeanFactory.currentProfile !== profile
    ) {
      FizzBuzzResolutionFacadeFactoryBeanFactory.currentProfile = profile;
      const factoryBean = new FizzBuzzResolutionFacadeFactoryBeanImpl(profile);
      FizzBuzzResolutionFacadeFactoryBeanFactory.instance =
        factoryBean.createResolutionFacade();
      FizzBuzzResolutionFacadeFactoryBeanFactory.factoryBean = factoryBean;
    }
    return FizzBuzzResolutionFacadeFactoryBeanFactory.instance;
  }

  static getFactoryBean(): IFizzBuzzResolutionFacadeFactoryBean | null {
    return FizzBuzzResolutionFacadeFactoryBeanFactory.factoryBean;
  }

  static getCurrentProfile(): FizzBuzzResolutionFacadeConfigurationProfile {
    return FizzBuzzResolutionFacadeFactoryBeanFactory.currentProfile;
  }

  static resetResolutionFacade(): void {
    FizzBuzzResolutionFacadeFactoryBeanFactory.instance = null;
    FizzBuzzResolutionFacadeFactoryBeanFactory.factoryBean = null;
    FizzBuzzResolutionFacadeFactoryBeanFactory.currentProfile = "STANDARD";
  }

  static getFactoryBeanName(): string {
    return FizzBuzzResolutionFacadeFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzResolutionFacadeFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}

class FizzBuzzResolutionFacadeFactoryBeanImpl
  implements IFizzBuzzResolutionFacadeFactoryBean
{
  private static readonly FACTORY_BEAN_IMPL_NAME =
    "FizzBuzzResolutionFacadeFactoryBeanImpl";
  private static readonly FACTORY_BEAN_IMPL_VERSION =
    "1.0.0-FACTORY-BEAN-IMPL";

  private readonly profile: FizzBuzzResolutionFacadeConfigurationProfile;

  constructor(profile: FizzBuzzResolutionFacadeConfigurationProfile) {
    this.profile = profile;
  }

  createResolutionFacade(): IFizzBuzzSingleValueResolutionFacade {
    const enterpriseService =
      FizzBuzzEnterpriseServiceFactoryBeanFactory.createEnterpriseService();
    const enterpriseServiceFacade = new FizzBuzzEnterpriseServiceFacadeImpl(
      enterpriseService,
    );
    const clientSideDelegate = new FizzBuzzClientSideServiceDelegateImpl(
      enterpriseServiceFacade,
    );
    const lookupServiceFactoryBean =
      BusinessDelegateLookupServiceFactoryBean.createLookupServiceFactoryBean(
        clientSideDelegate,
        DELEGATE_JNDI_NAME,
      );
    const lookupService: IBusinessDelegateLookupService =
      lookupServiceFactoryBean.createLookupService();
    const delegate: IFizzBuzzServiceDelegate = lookupService.lookupDelegate(
      DELEGATE_JNDI_NAME,
    );

    const commandInfrastructureFacade: IFizzBuzzCommandInfrastructureFacade =
      FizzBuzzCommandInfrastructureFacadeImpl.createDefaultFacade();
    const commandInvoker = commandInfrastructureFacade.getCommandInvoker();

    const computationCommand = new FizzBuzzValueResolutionCommandImpl(
      delegate,
      DELEGATE_JNDI_NAME,
    );

    const computationTemplate =
      FizzBuzzComputationTemplateFactoryBean.createTemplate();

    const requestBuilder: IFizzBuzzComputationRequestBuilder =
      new FizzBuzzComputationRequestBuilderImpl();

    return new FizzBuzzSingleValueResolutionFacadeImpl(
      requestBuilder,
      commandInvoker,
      computationCommand,
      computationTemplate,
    );
  }

  getFactoryBeanName(): string {
    return FizzBuzzResolutionFacadeFactoryBeanImpl.FACTORY_BEAN_IMPL_NAME;
  }

  getFactoryBeanVersion(): string {
    return FizzBuzzResolutionFacadeFactoryBeanImpl.FACTORY_BEAN_IMPL_VERSION;
  }

  getResolutionFacadeConfigurationProfile(): string {
    return this.profile;
  }
}
