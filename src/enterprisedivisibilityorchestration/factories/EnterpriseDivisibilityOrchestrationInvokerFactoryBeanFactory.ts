import type { IEnterpriseDivisibilityOrchestrationInvoker } from "../contracts/IEnterpriseDivisibilityOrchestrationInvoker.js";
import { ChainOfResponsibilityEnterpriseOrchestrationInvokerImpl } from "../impl/ChainOfResponsibilityEnterpriseOrchestrationInvokerImpl.js";

const FACTORY_BEAN_FACTORY_NAME = "EnterpriseDivisibilityOrchestrationInvokerFactoryBeanFactory";
const FACTORY_BEAN_FACTORY_VERSION = "1.0.0-INVOKER-FACTORY-BEAN-FACTORY";

let singletonInvoker: IEnterpriseDivisibilityOrchestrationInvoker | null = null;

class InvokerFactoryBeanImpl {
  private static readonly FACTORY_BEAN_IMPL_NAME = "EnterpriseDivisibilityOrchestrationInvokerFactoryBean";
  private static readonly FACTORY_BEAN_IMPL_VERSION = "1.0.0-INVOKER-FACTORY-BEAN";
  private readonly isSingletonInstance: boolean;
  private invoker: IEnterpriseDivisibilityOrchestrationInvoker | null = null;

  constructor(isSingleton: boolean) {
    this.isSingletonInstance = isSingleton;
  }

  createInvoker(): IEnterpriseDivisibilityOrchestrationInvoker {
    if (this.isSingletonInstance && this.invoker !== null) {
      return this.invoker;
    }
    const invoker = new ChainOfResponsibilityEnterpriseOrchestrationInvokerImpl();
    if (this.isSingletonInstance) {
      this.invoker = invoker;
    }
    return invoker;
  }

  getFactoryBeanName(): string {
    return InvokerFactoryBeanImpl.FACTORY_BEAN_IMPL_NAME;
  }

  getFactoryBeanVersion(): string {
    return InvokerFactoryBeanImpl.FACTORY_BEAN_IMPL_VERSION;
  }

  isSingleton(): boolean {
    return this.isSingletonInstance;
  }

  destroyInvoker(): void {
    this.invoker = null;
  }
}

export class EnterpriseDivisibilityOrchestrationInvokerFactoryBeanFactory {
  static createFactoryBean(
    singleton: boolean = true,
  ): InvokerFactoryBeanImpl {
    return new InvokerFactoryBeanImpl(singleton);
  }

  static createInvoker(): IEnterpriseDivisibilityOrchestrationInvoker {
    if (singletonInvoker === null) {
      const factoryBean = EnterpriseDivisibilityOrchestrationInvokerFactoryBeanFactory.createFactoryBean(true);
      singletonInvoker = factoryBean.createInvoker();
    }
    return singletonInvoker;
  }

  static getInvoker(): IEnterpriseDivisibilityOrchestrationInvoker | null {
    return singletonInvoker;
  }

  static resetInvoker(): void {
    singletonInvoker = null;
  }

  static getFactoryBeanFactoryName(): string {
    return FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return FACTORY_BEAN_FACTORY_VERSION;
  }
}
