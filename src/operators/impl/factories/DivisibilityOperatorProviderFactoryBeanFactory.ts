import type { IDivisibilityOperatorProviderFactoryBean } from "../../contracts/IDivisibilityOperatorProviderFactoryBean.js";
import type { IDivisibilityOperatorProvider } from "../../contracts/IDivisibilityOperatorProvider.js";
import { DivisibilityOperatorProviderFactoryBeanImpl } from "./DivisibilityOperatorProviderFactoryBeanImpl.js";

const FACTORY_BEAN_FACTORY_NAME = "DivisibilityOperatorProviderFactoryBeanFactory";
const FACTORY_BEAN_FACTORY_VERSION = "1.0.0-OPERATOR-PROVIDER-FACTORY-BEAN-FACTORY";

let singletonProviderInstance: IDivisibilityOperatorProvider | null = null;

export class DivisibilityOperatorProviderFactoryBeanFactory {
  static createProviderFactoryBean(
    singleton: boolean = true,
  ): IDivisibilityOperatorProviderFactoryBean {
    console.debug(
      `[${FACTORY_BEAN_FACTORY_NAME}] Creating divisibility operator provider factory bean (singleton=${singleton})`,
    );
    return new DivisibilityOperatorProviderFactoryBeanImpl(singleton);
  }

  static createProvider(): IDivisibilityOperatorProvider {
    if (singletonProviderInstance === null) {
      const factoryBean = DivisibilityOperatorProviderFactoryBeanFactory.createProviderFactoryBean(true);
      singletonProviderInstance = factoryBean.createProvider();
      console.debug(
        `[${FACTORY_BEAN_FACTORY_NAME}] Provider created with ${singletonProviderInstance.getRegisteredFactoryCount()} registered factory(ies)`,
      );
    }
    return singletonProviderInstance;
  }

  static getProvider(): IDivisibilityOperatorProvider | null {
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
