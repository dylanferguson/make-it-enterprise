import type { IDivisibilityOperatorChainBuilder } from "../../contracts/IDivisibilityOperatorChainBuilder.js";
import type { IDivisibilityOperatorChainBuilderFactoryBean } from "../../contracts/IDivisibilityOperatorChainBuilderFactoryBean.js";
import { StandardDivisibilityOperatorChainBuilderImpl } from "../builders/StandardDivisibilityOperatorChainBuilderImpl.js";

const FACTORY_BEAN_NAME = "DivisibilityOperatorChainBuilderFactoryBeanFactory";
const FACTORY_BEAN_VERSION = "1.0.0-CHAIN-BUILDER-FACTORY-BEAN-FACTORY";

let singletonBuilder: IDivisibilityOperatorChainBuilder | null = null;

class DivisibilityOperatorChainBuilderFactoryBeanImpl
  implements IDivisibilityOperatorChainBuilderFactoryBean
{
  private static readonly FACTORY_BEAN_IMPL_NAME = "DivisibilityOperatorChainBuilderFactoryBean";
  private static readonly FACTORY_BEAN_IMPL_VERSION = "1.0.0-CHAIN-BUILDER-FACTORY-BEAN";

  private readonly isSingletonInstance: boolean;
  private builder: IDivisibilityOperatorChainBuilder | null = null;

  constructor(isSingleton: boolean) {
    this.isSingletonInstance = isSingleton;
  }

  createBuilder(): IDivisibilityOperatorChainBuilder {
    if (this.isSingletonInstance && this.builder !== null) {
      return this.builder;
    }
    const builder = new StandardDivisibilityOperatorChainBuilderImpl();
    if (this.isSingletonInstance) {
      this.builder = builder;
    }
    return builder;
  }

  getFactoryBeanName(): string {
    return DivisibilityOperatorChainBuilderFactoryBeanImpl.FACTORY_BEAN_IMPL_NAME;
  }

  getFactoryBeanVersion(): string {
    return DivisibilityOperatorChainBuilderFactoryBeanImpl.FACTORY_BEAN_IMPL_VERSION;
  }

  isSingleton(): boolean {
    return this.isSingletonInstance;
  }

  destroyBuilder(): void {
    this.builder = null;
  }
}

export class DivisibilityOperatorChainBuilderFactoryBeanFactory {
  static createChainBuilderFactoryBean(
    singleton: boolean = true,
  ): IDivisibilityOperatorChainBuilderFactoryBean {
    return new DivisibilityOperatorChainBuilderFactoryBeanImpl(singleton);
  }

  static createBuilder(): IDivisibilityOperatorChainBuilder {
    const factoryBean = DivisibilityOperatorChainBuilderFactoryBeanFactory.createChainBuilderFactoryBean(true);
    return factoryBean.createBuilder();
  }

  static getOrCreateBuilder(): IDivisibilityOperatorChainBuilder {
    if (singletonBuilder === null) {
      singletonBuilder = DivisibilityOperatorChainBuilderFactoryBeanFactory.createBuilder();
    }
    return singletonBuilder;
  }

  static getBuilder(): IDivisibilityOperatorChainBuilder | null {
    return singletonBuilder;
  }

  static resetBuilder(): void {
    singletonBuilder = null;
  }

  static getFactoryBeanFactoryName(): string {
    return FACTORY_BEAN_NAME;
  }

  static getFactoryBeanFactoryVersion(): string {
    return FACTORY_BEAN_VERSION;
  }
}
