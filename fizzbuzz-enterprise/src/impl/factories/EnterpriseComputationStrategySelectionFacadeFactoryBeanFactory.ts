import { EnterpriseComputationStrategySelectorImpl } from "../selectors/EnterpriseComputationStrategySelectorImpl.js";
import { EnterpriseComputationStrategySelectionChainImpl } from "../chains/EnterpriseComputationStrategySelectionChainImpl.js";
import { ModuloEnterpriseComputationStrategySelectionHandlerImpl } from "../handlers/ModuloEnterpriseComputationStrategySelectionHandlerImpl.js";
import { DefaultEnterpriseComputationStrategySelectionHandlerImpl } from "../handlers/DefaultEnterpriseComputationStrategySelectionHandlerImpl.js";
import { EnterpriseComputationStrategyExecutionCommandFactoryImpl } from "./EnterpriseComputationStrategyExecutionCommandFactoryImpl.js";
import { EnterpriseComputationStrategyExecutionInterceptorChainImpl } from "../interceptors/EnterpriseComputationStrategyExecutionInterceptorChainImpl.js";
import { EnterpriseComputationStrategyExecutionValidationInterceptorImpl } from "../interceptors/EnterpriseComputationStrategyExecutionValidationInterceptorImpl.js";
import { EnterpriseComputationStrategyExecutionMetricsInterceptorImpl } from "../interceptors/EnterpriseComputationStrategyExecutionMetricsInterceptorImpl.js";
import { EnterpriseComputationStrategySelectionAuditVisitorImpl } from "../visitors/EnterpriseComputationStrategySelectionAuditVisitorImpl.js";
import { EnterpriseComputationStrategySelectionPolicyRegistryImpl } from "../registry/EnterpriseComputationStrategySelectionPolicyRegistryImpl.js";
import { StandardEnterpriseComputationStrategySelectionPolicyImpl } from "../policies/StandardEnterpriseComputationStrategySelectionPolicyImpl.js";
import { EnterpriseComputationStrategySelectionFacadeImpl } from "../facades/EnterpriseComputationStrategySelectionFacadeImpl.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseComputationStrategySelectionChain } from "../../contracts/IEnterpriseComputationStrategySelectionChain.js";
import type { IEnterpriseComputationStrategyExecutionInterceptorChain } from "../../contracts/IEnterpriseComputationStrategyExecutionInterceptorChain.js";

export class EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-SELECTION-FACADE-FACTORY-BEAN-FACTORY";

  private static instance: EnterpriseComputationStrategySelectionFacadeImpl | null = null;
  private static selectorInstance: EnterpriseComputationStrategySelectorImpl | null = null;

  static createSelectionFacade(
    delegate: IFizzBuzzSingleValueResolutionFacade,
    baseCommand: IFizzBuzzComputationCommand,
  ): EnterpriseComputationStrategySelectionFacadeImpl {
    if (EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory.instance === null) {
      const selector = EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory.createSelector(baseCommand);
      EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory.selectorInstance = selector;
      const facade = new EnterpriseComputationStrategySelectionFacadeImpl(delegate);
      EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory.instance = facade;
    }
    return EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory.instance;
  }

  static createSelector(
    baseCommand: IFizzBuzzComputationCommand,
  ): EnterpriseComputationStrategySelectorImpl {
    if (EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory.selectorInstance !== null) {
      return EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory.selectorInstance;
    }

    const selectionChain = EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory.buildSelectionChain();
    const executionCommandFactory = new EnterpriseComputationStrategyExecutionCommandFactoryImpl();
    const interceptorChain = EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory.buildInterceptorChain();
    const auditVisitor = new EnterpriseComputationStrategySelectionAuditVisitorImpl();

    const selector = new EnterpriseComputationStrategySelectorImpl(
      baseCommand,
      selectionChain,
      executionCommandFactory,
      interceptorChain,
      [auditVisitor],
    );

    EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory.selectorInstance = selector;
    return selector;
  }

  static getSelector(): EnterpriseComputationStrategySelectorImpl | null {
    return EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory.selectorInstance;
  }

  static resetInstance(): void {
    EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory.instance = null;
    EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory.selectorInstance = null;
  }

  static getFactoryBeanName(): string {
    return EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseComputationStrategySelectionFacadeFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }

  private static buildSelectionChain(): IEnterpriseComputationStrategySelectionChain {
    const chain = new EnterpriseComputationStrategySelectionChainImpl();
    chain.addHandler(new ModuloEnterpriseComputationStrategySelectionHandlerImpl());
    chain.addHandler(new DefaultEnterpriseComputationStrategySelectionHandlerImpl());
    return chain;
  }

  private static buildInterceptorChain(): IEnterpriseComputationStrategyExecutionInterceptorChain {
    const chain = new EnterpriseComputationStrategyExecutionInterceptorChainImpl();
    chain.addInterceptor(new EnterpriseComputationStrategyExecutionValidationInterceptorImpl());
    chain.addInterceptor(new EnterpriseComputationStrategyExecutionMetricsInterceptorImpl());
    return chain;
  }

  private static buildPolicyRegistry(): EnterpriseComputationStrategySelectionPolicyRegistryImpl {
    const registry = new EnterpriseComputationStrategySelectionPolicyRegistryImpl();
    registry.registerPolicy(new StandardEnterpriseComputationStrategySelectionPolicyImpl());
    return registry;
  }
}
