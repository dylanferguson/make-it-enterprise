import type { IEnterpriseFizzBuzzResultValidationSpecificationFactory } from "../contracts/IEnterpriseFizzBuzzResultValidationSpecificationFactory.js";
import { DefaultEnterpriseFizzBuzzResultValidationSpecificationFactoryImpl } from "../impl/DefaultEnterpriseFizzBuzzResultValidationSpecificationFactoryImpl.js";

const FACTORY_BEAN_FACTORY_NAME = "ResultValidationSpecificationFactoryBeanFactory";
const FACTORY_BEAN_FACTORY_VERSION = "1.0.0-VALIDATION-FACTORY-BEAN-FACTORY";

let singletonFactory: IEnterpriseFizzBuzzResultValidationSpecificationFactory | null = null;

class ResultValidationSpecificationFactoryBeanImpl {
  private static readonly FACTORY_BEAN_IMPL_NAME = "EnterpriseResultValidationSpecificationFactoryBean";
  private static readonly FACTORY_BEAN_IMPL_VERSION = "1.0.0-VALIDATION-FACTORY-BEAN";
  private readonly isSingletonInstance: boolean;
  private factory: IEnterpriseFizzBuzzResultValidationSpecificationFactory | null = null;

  constructor(isSingleton: boolean) {
    this.isSingletonInstance = isSingleton;
  }

  createFactory(): IEnterpriseFizzBuzzResultValidationSpecificationFactory {
    if (this.isSingletonInstance && this.factory !== null) {
      return this.factory;
    }
    const newFactory = new DefaultEnterpriseFizzBuzzResultValidationSpecificationFactoryImpl();
    if (this.isSingletonInstance) {
      this.factory = newFactory;
    }
    return newFactory;
  }

  getFactoryBeanName(): string {
    return ResultValidationSpecificationFactoryBeanImpl.FACTORY_BEAN_IMPL_NAME;
  }

  getFactoryBeanVersion(): string {
    return ResultValidationSpecificationFactoryBeanImpl.FACTORY_BEAN_IMPL_VERSION;
  }

  isSingleton(): boolean {
    return this.isSingletonInstance;
  }
}

export class ResultValidationSpecificationFactoryBeanFactory {
  static createFactoryBean(singleton: boolean = true): ResultValidationSpecificationFactoryBeanImpl {
    return new ResultValidationSpecificationFactoryBeanImpl(singleton);
  }

  static createFactory(): IEnterpriseFizzBuzzResultValidationSpecificationFactory {
    if (singletonFactory === null) {
      const factoryBean = ResultValidationSpecificationFactoryBeanFactory.createFactoryBean(true);
      singletonFactory = factoryBean.createFactory();
    }
    return singletonFactory;
  }

  static getFactory(): IEnterpriseFizzBuzzResultValidationSpecificationFactory | null {
    return singletonFactory;
  }

  static resetFactory(): void {
    singletonFactory = null;
  }

  static getFactoryBeanFactoryName(): string {
    return FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return FACTORY_BEAN_FACTORY_VERSION;
  }
}
