import type { IEnterpriseDivisibilityOrchestrationTemplateMethod } from "../contracts/IEnterpriseDivisibilityOrchestrationTemplateMethod.js";
import type { IEnterpriseDivisibilityOrchestrationBridgeImplementor } from "../contracts/IEnterpriseDivisibilityOrchestrationBridgeImplementor.js";
import { StandardEnterpriseDivisibilityOrchestrationTemplateMethodImpl } from "../impl/StandardEnterpriseDivisibilityOrchestrationTemplateMethodImpl.js";

const FACTORY_BEAN_FACTORY_NAME = "EnterpriseDivisibilityOrchestrationTemplateMethodFactoryBeanFactory";
const FACTORY_BEAN_FACTORY_VERSION = "1.0.0-TEMPLATE-METHOD-FACTORY-BEAN-FACTORY";

let singletonTemplateMethod: IEnterpriseDivisibilityOrchestrationTemplateMethod | null = null;

class TemplateMethodFactoryBeanImpl {
  private static readonly FACTORY_BEAN_IMPL_NAME = "EnterpriseDivisibilityOrchestrationTemplateMethodFactoryBean";
  private static readonly FACTORY_BEAN_IMPL_VERSION = "1.0.0-TEMPLATE-METHOD-FACTORY-BEAN";
  private readonly isSingletonInstance: boolean;
  private templateMethod: IEnterpriseDivisibilityOrchestrationTemplateMethod | null = null;

  constructor(isSingleton: boolean) {
    this.isSingletonInstance = isSingleton;
  }

  createTemplateMethod(): IEnterpriseDivisibilityOrchestrationTemplateMethod {
    if (this.isSingletonInstance && this.templateMethod !== null) {
      return this.templateMethod;
    }
    const tm = new StandardEnterpriseDivisibilityOrchestrationTemplateMethodImpl();
    if (this.isSingletonInstance) {
      this.templateMethod = tm;
    }
    return tm;
  }

  getFactoryBeanName(): string {
    return TemplateMethodFactoryBeanImpl.FACTORY_BEAN_IMPL_NAME;
  }

  getFactoryBeanVersion(): string {
    return TemplateMethodFactoryBeanImpl.FACTORY_BEAN_IMPL_VERSION;
  }

  isSingleton(): boolean {
    return this.isSingletonInstance;
  }

  destroyTemplateMethod(): void {
    this.templateMethod = null;
  }
}

export class EnterpriseDivisibilityOrchestrationTemplateMethodFactoryBeanFactory {
  private static infrastructureInitialized = false;

  static createFactoryBean(
    singleton: boolean = true,
  ): TemplateMethodFactoryBeanImpl {
    return new TemplateMethodFactoryBeanImpl(singleton);
  }

  static initializeTemplateMethodInfrastructure(
    implementor: IEnterpriseDivisibilityOrchestrationBridgeImplementor,
  ): IEnterpriseDivisibilityOrchestrationTemplateMethod {
    if (singletonTemplateMethod === null) {
      const factoryBean = EnterpriseDivisibilityOrchestrationTemplateMethodFactoryBeanFactory.createFactoryBean(true);
      singletonTemplateMethod = factoryBean.createTemplateMethod();
    }
    if (!EnterpriseDivisibilityOrchestrationTemplateMethodFactoryBeanFactory.infrastructureInitialized) {
      singletonTemplateMethod.setBridgeImplementor(implementor);
      EnterpriseDivisibilityOrchestrationTemplateMethodFactoryBeanFactory.infrastructureInitialized = true;
    }
    return singletonTemplateMethod;
  }

  static getTemplateMethod(): IEnterpriseDivisibilityOrchestrationTemplateMethod | null {
    return singletonTemplateMethod;
  }

  static isInfrastructureInitialized(): boolean {
    return EnterpriseDivisibilityOrchestrationTemplateMethodFactoryBeanFactory.infrastructureInitialized;
  }

  static resetInfrastructure(): void {
    singletonTemplateMethod = null;
    EnterpriseDivisibilityOrchestrationTemplateMethodFactoryBeanFactory.infrastructureInitialized = false;
  }

  static getFactoryBeanFactoryName(): string {
    return FACTORY_BEAN_FACTORY_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return FACTORY_BEAN_FACTORY_VERSION;
  }
}
