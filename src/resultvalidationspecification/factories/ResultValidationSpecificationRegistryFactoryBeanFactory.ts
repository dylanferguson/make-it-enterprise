import type { IEnterpriseFizzBuzzResultValidationSpecificationRegistry } from "../contracts/IEnterpriseFizzBuzzResultValidationSpecificationRegistry.js";
import { DefaultEnterpriseFizzBuzzResultValidationSpecificationRegistryImpl } from "../impl/DefaultEnterpriseFizzBuzzResultValidationSpecificationRegistryImpl.js";

const FACTORY_BEAN_FACTORY_NAME = "ResultValidationSpecificationRegistryFactoryBeanFactory";
const FACTORY_BEAN_FACTORY_VERSION = "1.0.0-VALIDATION-REGISTRY-FACTORY-BEAN-FACTORY";

let singletonRegistry: IEnterpriseFizzBuzzResultValidationSpecificationRegistry | null = null;
let infrastructureInitialized = false;

class ResultValidationSpecificationRegistryFactoryBeanImpl {
  private static readonly FACTORY_BEAN_IMPL_NAME = "EnterpriseResultValidationSpecificationRegistryFactoryBean";
  private static readonly FACTORY_BEAN_IMPL_VERSION = "1.0.0-VALIDATION-REGISTRY-FACTORY-BEAN";
  private readonly isSingletonInstance: boolean;
  private registry: IEnterpriseFizzBuzzResultValidationSpecificationRegistry | null = null;

  constructor(isSingleton: boolean) {
    this.isSingletonInstance = isSingleton;
  }

  createRegistry(): IEnterpriseFizzBuzzResultValidationSpecificationRegistry {
    if (this.isSingletonInstance && this.registry !== null) {
      return this.registry;
    }
    const newRegistry = new DefaultEnterpriseFizzBuzzResultValidationSpecificationRegistryImpl();
    if (this.isSingletonInstance) {
      this.registry = newRegistry;
    }
    return newRegistry;
  }

  getFactoryBeanName(): string {
    return ResultValidationSpecificationRegistryFactoryBeanImpl.FACTORY_BEAN_IMPL_NAME;
  }

  getFactoryBeanVersion(): string {
    return ResultValidationSpecificationRegistryFactoryBeanImpl.FACTORY_BEAN_IMPL_VERSION;
  }

  isSingleton(): boolean {
    return this.isSingletonInstance;
  }
}

export class ResultValidationSpecificationRegistryFactoryBeanFactory {
  static createFactoryBean(singleton: boolean = true): ResultValidationSpecificationRegistryFactoryBeanImpl {
    return new ResultValidationSpecificationRegistryFactoryBeanImpl(singleton);
  }

  static getOrCreateRegistry(): IEnterpriseFizzBuzzResultValidationSpecificationRegistry {
    if (singletonRegistry === null) {
      const factoryBean = ResultValidationSpecificationRegistryFactoryBeanFactory.createFactoryBean(true);
      singletonRegistry = factoryBean.createRegistry();
    }
    return singletonRegistry;
  }

  static getRegistry(): IEnterpriseFizzBuzzResultValidationSpecificationRegistry | null {
    return singletonRegistry;
  }

  static resetRegistry(): void {
    singletonRegistry = null;
    infrastructureInitialized = false;
  }

  static initializeInfrastructure(): IEnterpriseFizzBuzzResultValidationSpecificationRegistry {
    if (!infrastructureInitialized) {
      const registry = ResultValidationSpecificationRegistryFactoryBeanFactory.getOrCreateRegistry();
      infrastructureInitialized = true;
      return registry;
    }
    return singletonRegistry!;
  }

  static isInfrastructureInitialized(): boolean {
    return infrastructureInitialized;
  }

  static getFactoryBeanFactoryName(): string {
    return FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return FACTORY_BEAN_FACTORY_VERSION;
  }
}
