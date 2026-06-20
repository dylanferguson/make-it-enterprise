import type { IRemainderComputationStrategyProvider } from "../../contracts/IRemainderComputationStrategyProvider.js";
import type { IRemainderComputationStrategyProviderFactoryBean } from "../../contracts/IRemainderComputationStrategyProviderFactoryBean.js";
import { RemainderComputationStrategyProviderFactoryBeanImpl } from "./RemainderComputationStrategyProviderFactoryBeanImpl.js";

const FACTORY_BEAN_FACTORY_NAME = "RemainderComputationStrategyProviderFactoryBeanFactory";
const FACTORY_BEAN_FACTORY_VERSION = "1.0.0-REMAINDER-STRATEGY-PROVIDER-FACTORY-BEAN-FACTORY";

let singletonProviderInstance: IRemainderComputationStrategyProvider | null = null;

export class RemainderComputationStrategyProviderFactoryBeanFactory {
  static createProviderFactoryBean(
    singleton: boolean = true,
  ): IRemainderComputationStrategyProviderFactoryBean {
    console.debug(
      `[${FACTORY_BEAN_FACTORY_NAME}] Creating remainder computation strategy provider factory bean (singleton=${singleton})`,
    );
    return new RemainderComputationStrategyProviderFactoryBeanImpl(singleton);
  }

  static createProvider(): IRemainderComputationStrategyProvider {
    if (singletonProviderInstance === null) {
      const factoryBean = RemainderComputationStrategyProviderFactoryBeanFactory.createProviderFactoryBean(true);
      singletonProviderInstance = factoryBean.createProvider();
      console.debug(
        `[${FACTORY_BEAN_FACTORY_NAME}] Remainder computation strategy provider created: provider=[${singletonProviderInstance.getProviderName()} v${singletonProviderInstance.getProviderVersion()}], selector=[${singletonProviderInstance.getStrategySelector().getSelectorName()} v${singletonProviderInstance.getStrategySelector().getSelectorVersion()}], registeredDivisors=[${singletonProviderInstance.getStrategySelector().getRegisteredDivisorCount()}]`,
      );
    }
    return singletonProviderInstance;
  }

  static getProvider(): IRemainderComputationStrategyProvider | null {
    return singletonProviderInstance;
  }

  static resetProvider(): void {
    singletonProviderInstance = null;
  }

  static getFactoryBeanFactoryName(): string {
    return FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return FACTORY_BEAN_FACTORY_VERSION;
  }
}
