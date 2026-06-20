import { FizzBuzzSingleValueResolutionFacadeImpl } from "../facades/FizzBuzzSingleValueResolutionFacadeImpl.js";
import { FizzBuzzComputationRequestBuilderImpl } from "../builders/FizzBuzzComputationRequestBuilderImpl.js";
import { FizzBuzzComputationTemplateFactoryBean } from "./FizzBuzzComputationTemplateFactoryBean.js";
import { FizzBuzzCommandInfrastructureFacadeImpl } from "../services/FizzBuzzCommandInfrastructureFacadeImpl.js";
import { ExpressionTreeBasedFizzBuzzValueResolutionCommandImpl } from "../commands/ExpressionTreeBasedFizzBuzzValueResolutionCommandImpl.js";
import { FizzBuzzExpressionRuleSetFactoryBeanFactory } from "./FizzBuzzExpressionRuleSetFactoryBeanFactory.js";
import { CachingFizzBuzzComputationCommandDecoratorImpl } from "../decorators/CachingFizzBuzzComputationCommandDecoratorImpl.js";
import { AuditingFizzBuzzComputationCommandDecoratorImpl } from "../decorators/AuditingFizzBuzzComputationCommandDecoratorImpl.js";
import { OrchestratorEnabledFizzBuzzComputationCommandDecoratorImpl } from "../decorators/OrchestratorEnabledFizzBuzzComputationCommandDecoratorImpl.js";
import { FizzBuzzEnterpriseComputationOrchestratorFactoryBeanFactory } from "./FizzBuzzEnterpriseComputationOrchestratorFactoryBeanFactory.js";
import { ServiceLocatorFactoryBeanFactory } from "./ServiceLocatorFactoryBean.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IFizzBuzzResolutionFacadeFactoryBean } from "../../contracts/IFizzBuzzResolutionFacadeFactoryBean.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzExpressionEvaluator } from "../../contracts/IFizzBuzzExpressionEvaluator.js";
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
    const commandInfrastructureFacade: IFizzBuzzCommandInfrastructureFacade =
      FizzBuzzCommandInfrastructureFacadeImpl.createDefaultFacade();
    const commandInvoker = commandInfrastructureFacade.getCommandInvoker();

    const expressionEvaluator: IFizzBuzzExpressionEvaluator =
      FizzBuzzExpressionRuleSetFactoryBeanFactory.createSingletonExpressionEvaluator();
    const baseCommand = new ExpressionTreeBasedFizzBuzzValueResolutionCommandImpl(
      expressionEvaluator,
    );
    const cachingDecorator = new CachingFizzBuzzComputationCommandDecoratorImpl(
      baseCommand,
    );
    const auditingDecorator =
      new AuditingFizzBuzzComputationCommandDecoratorImpl(
        cachingDecorator,
      );
    const serviceLocator = ServiceLocatorFactoryBeanFactory.createFactoryBean().createServiceLocator();
    const orchestrator =
      FizzBuzzEnterpriseComputationOrchestratorFactoryBeanFactory.createOrchestrator(serviceLocator);
    const computationCommand: IFizzBuzzComputationCommand =
      new OrchestratorEnabledFizzBuzzComputationCommandDecoratorImpl(
        auditingDecorator,
        orchestrator,
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
