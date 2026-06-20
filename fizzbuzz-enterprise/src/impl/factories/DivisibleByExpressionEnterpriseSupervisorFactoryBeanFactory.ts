import type { IRemainderComputationSupervisor } from "../../contracts/IRemainderComputationSupervisor.js";
import { DefaultRemainderComputationStrategyResolverLocatorImpl } from "../locators/DefaultRemainderComputationStrategyResolverLocatorImpl.js";

export class DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ENTERPRISE-SUPERVISOR-FACTORY";
  private static initialized = false;

  static initializeEnterpriseSupervisorChain(): void {
    if (!DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.initialized) {
      const locator = DefaultRemainderComputationStrategyResolverLocatorImpl.getInstance();
      locator.resolveRemainderComputationSupervisor();
      DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.initialized = true;
      console.debug(
        `[${DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.FACTORY_BEAN_NAME}] ` +
        `Enterprise supervisor chain initialized via locator [${locator.getLocatorName()} v${locator.getLocatorVersion()}]`,
      );
    }
  }

  static resolveEnterpriseSupervisor(): IRemainderComputationSupervisor {
    DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.initializeEnterpriseSupervisorChain();
    return DefaultRemainderComputationStrategyResolverLocatorImpl.getInstance()
      .resolveRemainderComputationSupervisor();
  }

  static isEnterpriseSupervisorChainInitialized(): boolean {
    return DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.initialized;
  }

  static resetEnterpriseSupervisorChain(): void {
    DefaultRemainderComputationStrategyResolverLocatorImpl.resetInstance();
    DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.initialized = false;
  }

  static getFactoryBeanName(): string {
    return DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return DivisibleByExpressionEnterpriseSupervisorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
