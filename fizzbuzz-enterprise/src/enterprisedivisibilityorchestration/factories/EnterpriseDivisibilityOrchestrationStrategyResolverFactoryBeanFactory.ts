import type { IEnterpriseDivisibilityOrchestrationStrategyResolver } from "../contracts/IEnterpriseDivisibilityOrchestrationStrategyResolver.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseDivisibilityOrchestrationInvoker } from "../contracts/IEnterpriseDivisibilityOrchestrationInvoker.js";
import type { IEnterpriseDivisibilityOrchestrationTemplateMethod } from "../contracts/IEnterpriseDivisibilityOrchestrationTemplateMethod.js";
import { DivisorBasedEnterpriseOrchestrationStrategyResolverImpl } from "../impl/DivisorBasedEnterpriseOrchestrationStrategyResolverImpl.js";

const FACTORY_BEAN_FACTORY_NAME = "EnterpriseDivisibilityOrchestrationStrategyResolverFactoryBeanFactory";
const FACTORY_BEAN_FACTORY_VERSION = "1.0.0-STRATEGY-RESOLVER-FACTORY-BEAN-FACTORY";

let singletonStrategyResolver: IEnterpriseDivisibilityOrchestrationStrategyResolver | null = null;

class StrategyResolverFactoryBeanImpl {
  private static readonly FACTORY_BEAN_IMPL_NAME = "EnterpriseDivisibilityOrchestrationStrategyResolverFactoryBean";
  private static readonly FACTORY_BEAN_IMPL_VERSION = "1.0.0-STRATEGY-RESOLVER-FACTORY-BEAN";
  private readonly isSingletonInstance: boolean;
  private strategyResolver: IEnterpriseDivisibilityOrchestrationStrategyResolver | null = null;

  constructor(isSingleton: boolean) {
    this.isSingletonInstance = isSingleton;
  }

  createStrategyResolver(
    invoker: IEnterpriseDivisibilityOrchestrationInvoker,
    innerFacade: IFizzBuzzSingleValueResolutionFacade,
    orchestrationTemplate: IEnterpriseDivisibilityOrchestrationTemplateMethod,
  ): IEnterpriseDivisibilityOrchestrationStrategyResolver {
    if (this.isSingletonInstance && this.strategyResolver !== null) {
      return this.strategyResolver;
    }
    const resolver = new DivisorBasedEnterpriseOrchestrationStrategyResolverImpl(
      invoker,
      innerFacade,
      orchestrationTemplate,
    );
    if (this.isSingletonInstance) {
      this.strategyResolver = resolver;
    }
    return resolver;
  }

  getFactoryBeanName(): string {
    return StrategyResolverFactoryBeanImpl.FACTORY_BEAN_IMPL_NAME;
  }

  getFactoryBeanVersion(): string {
    return StrategyResolverFactoryBeanImpl.FACTORY_BEAN_IMPL_VERSION;
  }

  isSingleton(): boolean {
    return this.isSingletonInstance;
  }

  destroyStrategyResolver(): void {
    this.strategyResolver = null;
  }
}

export class EnterpriseDivisibilityOrchestrationStrategyResolverFactoryBeanFactory {
  static createFactoryBean(
    singleton: boolean = true,
  ): StrategyResolverFactoryBeanImpl {
    return new StrategyResolverFactoryBeanImpl(singleton);
  }

  static createStrategyResolver(
    invoker: IEnterpriseDivisibilityOrchestrationInvoker,
    innerFacade: IFizzBuzzSingleValueResolutionFacade,
    orchestrationTemplate: IEnterpriseDivisibilityOrchestrationTemplateMethod,
  ): IEnterpriseDivisibilityOrchestrationStrategyResolver {
    if (singletonStrategyResolver === null) {
      const factoryBean = EnterpriseDivisibilityOrchestrationStrategyResolverFactoryBeanFactory.createFactoryBean(true);
      singletonStrategyResolver = factoryBean.createStrategyResolver(invoker, innerFacade, orchestrationTemplate);
    }
    return singletonStrategyResolver;
  }

  static getStrategyResolver(): IEnterpriseDivisibilityOrchestrationStrategyResolver | null {
    return singletonStrategyResolver;
  }

  static resetStrategyResolver(): void {
    singletonStrategyResolver = null;
  }

  static getFactoryBeanFactoryName(): string {
    return FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return FACTORY_BEAN_FACTORY_VERSION;
  }
}
