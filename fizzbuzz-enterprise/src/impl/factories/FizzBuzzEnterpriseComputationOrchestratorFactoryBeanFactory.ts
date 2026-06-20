import type { IFizzBuzzEnterpriseComputationOrchestrator } from "../../contracts/IFizzBuzzEnterpriseComputationOrchestrator.js";
import type { IFizzBuzzEnterpriseComputationOrchestratorBuilder } from "../../contracts/IFizzBuzzEnterpriseComputationOrchestratorBuilder.js";
import type { IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher } from "../../contracts/IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher.js";
import type { IFizzBuzzStrategyResolutionChainHandler } from "../../contracts/IFizzBuzzStrategyResolutionChainHandler.js";
import type { IServiceLocator } from "../../contracts/IServiceLocator.js";
import { FizzBuzzEnterpriseComputationOrchestratorBuilderImpl } from "../orchestrator/FizzBuzzEnterpriseComputationOrchestratorBuilderImpl.js";
import { FizzBuzzEnterpriseComputationOrchestratorVisitorDispatcherImpl } from "../orchestrator/FizzBuzzEnterpriseComputationOrchestratorVisitorDispatcherImpl.js";
import { ModuloDivisibilityStrategySelectionOrchestratorVisitorImpl } from "../orchestrator/ModuloDivisibilityStrategySelectionOrchestratorVisitorImpl.js";
import { ServiceLocatorBackedFizzBuzzStrategyResolutionChainHandlerImpl } from "../orchestrator/ServiceLocatorBackedFizzBuzzStrategyResolutionChainHandlerImpl.js";
import { DefaultFizzBuzzStrategyResolutionChainHandlerImpl } from "../orchestrator/DefaultFizzBuzzStrategyResolutionChainHandlerImpl.js";
import { ServiceLocatorFactoryBeanFactory } from "./ServiceLocatorFactoryBean.js";

export class FizzBuzzEnterpriseComputationOrchestratorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzEnterpriseComputationOrchestratorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "2.0.0-ORCHESTRATOR-FACTORY-BEAN-FACTORY";
  private static readonly DEFAULT_ORCHESTRATOR_NAME = "FizzBuzzEnterpriseComputationOrchestrator";
  private static readonly DEFAULT_ORCHESTRATOR_VERSION = "2.0.0-ORCHESTRATOR-ENTERPRISE";

  private static instance: IFizzBuzzEnterpriseComputationOrchestrator | null = null;

  static createOrchestrator(
    serviceLocator?: IServiceLocator,
  ): IFizzBuzzEnterpriseComputationOrchestrator {
    if (FizzBuzzEnterpriseComputationOrchestratorFactoryBeanFactory.instance === null) {
      const resolvedServiceLocator: IServiceLocator =
        serviceLocator ?? ServiceLocatorFactoryBeanFactory.createFactoryBean().createServiceLocator();
      FizzBuzzEnterpriseComputationOrchestratorFactoryBeanFactory.instance =
        FizzBuzzEnterpriseComputationOrchestratorFactoryBeanFactory.buildOrchestrator(resolvedServiceLocator);
    }
    return FizzBuzzEnterpriseComputationOrchestratorFactoryBeanFactory.instance;
  }

  static resetOrchestrator(): void {
    FizzBuzzEnterpriseComputationOrchestratorFactoryBeanFactory.instance = null;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzEnterpriseComputationOrchestratorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzEnterpriseComputationOrchestratorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  private static buildOrchestrator(
    serviceLocator: IServiceLocator,
  ): IFizzBuzzEnterpriseComputationOrchestrator {
    const serviceLocatorChainHandler: ServiceLocatorBackedFizzBuzzStrategyResolutionChainHandlerImpl =
      new ServiceLocatorBackedFizzBuzzStrategyResolutionChainHandlerImpl(serviceLocator);
    const defaultChainHandler: DefaultFizzBuzzStrategyResolutionChainHandlerImpl =
      new DefaultFizzBuzzStrategyResolutionChainHandlerImpl();
    serviceLocatorChainHandler.setNext(defaultChainHandler);

    const strategyResolutionChainHead: IFizzBuzzStrategyResolutionChainHandler = serviceLocatorChainHandler;

    const orchestratorVisitor: ModuloDivisibilityStrategySelectionOrchestratorVisitorImpl =
      new ModuloDivisibilityStrategySelectionOrchestratorVisitorImpl(strategyResolutionChainHead, true);

    const visitorDispatcher: IFizzBuzzEnterpriseComputationOrchestratorVisitorDispatcher =
      new FizzBuzzEnterpriseComputationOrchestratorVisitorDispatcherImpl();
    visitorDispatcher.registerVisitor(orchestratorVisitor);

    const builder: IFizzBuzzEnterpriseComputationOrchestratorBuilder =
      new FizzBuzzEnterpriseComputationOrchestratorBuilderImpl()
        .withOrchestratorName(FizzBuzzEnterpriseComputationOrchestratorFactoryBeanFactory.DEFAULT_ORCHESTRATOR_NAME)
        .withOrchestratorVersion(FizzBuzzEnterpriseComputationOrchestratorFactoryBeanFactory.DEFAULT_ORCHESTRATOR_VERSION)
        .withOrchestrationEnabled(true)
        .withVisitorDispatcher(visitorDispatcher);

    return builder.build();
  }
}
