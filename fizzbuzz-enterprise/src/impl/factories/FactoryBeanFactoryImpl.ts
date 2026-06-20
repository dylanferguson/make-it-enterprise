import type { IFactoryBeanFactory } from "../../contracts/IFactoryBeanFactory.js";
import type { IObjectFactory } from "../../contracts/IObjectFactory.js";

export class FactoryBeanFactoryImpl implements IFactoryBeanFactory {
  private static readonly FACTORY_BEAN_FACTORY_NAME = "FactoryBeanFactoryImpl";
  private static readonly FACTORY_BEAN_FACTORY_VERSION = "2.0.0-ENTERPRISE";
  private readonly registeredFactories: Map<string, () => IObjectFactory<unknown>> = new Map();

  registerFactoryBean(factoryBeanName: string, factoryCreator: () => IObjectFactory<unknown>): void {
    this.registeredFactories.set(factoryBeanName, factoryCreator);
  }

  createFactoryBean(factoryBeanName: string): IObjectFactory<unknown> {
    const creator = this.registeredFactories.get(factoryBeanName);
    if (creator === undefined) {
      throw new Error(
        `[${FactoryBeanFactoryImpl.FACTORY_BEAN_FACTORY_NAME}] No factory registered for: ${factoryBeanName}`,
      );
    }
    return creator();
  }

  getFactoryBeanFactoryName(): string {
    return FactoryBeanFactoryImpl.FACTORY_BEAN_FACTORY_NAME;
  }

  getFactoryBeanFactoryVersion(): string {
    return FactoryBeanFactoryImpl.FACTORY_BEAN_FACTORY_VERSION;
  }

  getRegisteredFactoryBeanNames(): readonly string[] {
    return Array.from(this.registeredFactories.keys());
  }
}
