import type { IEnterpriseDivisibilityOrchestrationBridgeImplementor } from "../contracts/IEnterpriseDivisibilityOrchestrationBridgeImplementor.js";
import { StandardNativeModuloBridgeImplementorImpl } from "../impl/StandardNativeModuloBridgeImplementorImpl.js";

const FACTORY_BEAN_FACTORY_NAME = "EnterpriseDivisibilityOrchestrationBridgeImplementorFactoryBeanFactory";
const FACTORY_BEAN_FACTORY_VERSION = "1.0.0-BRIDGE-IMPLEMENTOR-FACTORY-BEAN-FACTORY";

let singletonBridgeImplementor: IEnterpriseDivisibilityOrchestrationBridgeImplementor | null = null;

class BridgeImplementorFactoryBeanImpl {
  private static readonly FACTORY_BEAN_IMPL_NAME = "EnterpriseDivisibilityOrchestrationBridgeImplementorFactoryBean";
  private static readonly FACTORY_BEAN_IMPL_VERSION = "1.0.0-BRIDGE-IMPLEMENTOR-FACTORY-BEAN";
  private readonly isSingletonInstance: boolean;
  private implementor: IEnterpriseDivisibilityOrchestrationBridgeImplementor | null = null;

  constructor(isSingleton: boolean) {
    this.isSingletonInstance = isSingleton;
  }

  createImplementor(): IEnterpriseDivisibilityOrchestrationBridgeImplementor {
    if (this.isSingletonInstance && this.implementor !== null) {
      return this.implementor;
    }
    const implementor = new StandardNativeModuloBridgeImplementorImpl();
    if (this.isSingletonInstance) {
      this.implementor = implementor;
    }
    return implementor;
  }

  getFactoryBeanName(): string {
    return BridgeImplementorFactoryBeanImpl.FACTORY_BEAN_IMPL_NAME;
  }

  getFactoryBeanVersion(): string {
    return BridgeImplementorFactoryBeanImpl.FACTORY_BEAN_IMPL_VERSION;
  }

  isSingleton(): boolean {
    return this.isSingletonInstance;
  }

  destroyImplementor(): void {
    this.implementor = null;
  }
}

export class EnterpriseDivisibilityOrchestrationBridgeImplementorFactoryBeanFactory {
  static createFactoryBean(
    singleton: boolean = true,
  ): BridgeImplementorFactoryBeanImpl {
    return new BridgeImplementorFactoryBeanImpl(singleton);
  }

  static createImplementor(): IEnterpriseDivisibilityOrchestrationBridgeImplementor {
    if (singletonBridgeImplementor === null) {
      const factoryBean = EnterpriseDivisibilityOrchestrationBridgeImplementorFactoryBeanFactory.createFactoryBean(true);
      singletonBridgeImplementor = factoryBean.createImplementor();
    }
    return singletonBridgeImplementor;
  }

  static getImplementor(): IEnterpriseDivisibilityOrchestrationBridgeImplementor | null {
    return singletonBridgeImplementor;
  }

  static resetImplementor(): void {
    singletonBridgeImplementor = null;
  }

  static getFactoryBeanFactoryName(): string {
    return FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return FACTORY_BEAN_FACTORY_VERSION;
  }
}
