import type { IFizzBuzzComputationPipelineProductFactoryBean } from "../contracts/IFizzBuzzComputationPipelineProductFactoryBean.js";
import { StandardFizzBuzzComputationPipelineProductFactoryBeanImpl } from "../impl/StandardFizzBuzzComputationPipelineProductFactoryBeanImpl.js";

const FACTORY_BEAN_FACTORY_NAME = "FizzBuzzComputationPipelineProductFactoryBeanFactory";
const FACTORY_BEAN_FACTORY_VERSION = "1.0.0-PRODUCT-FACTORY-BEAN-FACTORY";

let singletonFactoryBean: IFizzBuzzComputationPipelineProductFactoryBean | null = null;

export class FizzBuzzComputationPipelineProductFactoryBeanFactory {
  static createFactoryBean(singleton: boolean = false): IFizzBuzzComputationPipelineProductFactoryBean {
    if (singleton && singletonFactoryBean !== null) {
      return singletonFactoryBean;
    }
    const factoryBean = new StandardFizzBuzzComputationPipelineProductFactoryBeanImpl();
    if (singleton) {
      singletonFactoryBean = factoryBean;
    }
    console.debug(
      `[${FACTORY_BEAN_FACTORY_NAME}] Created product factory bean ` +
      `(singleton=${singleton}, name=${factoryBean.getFactoryBeanName()} v${factoryBean.getFactoryBeanVersion()})`,
    );
    return factoryBean;
  }

  static getSingletonFactoryBean(): IFizzBuzzComputationPipelineProductFactoryBean | null {
    return singletonFactoryBean;
  }

  static reset(): void {
    singletonFactoryBean = null;
  }

  static getFactoryBeanFactoryName(): string {
    return FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return FACTORY_BEAN_FACTORY_VERSION;
  }
}
