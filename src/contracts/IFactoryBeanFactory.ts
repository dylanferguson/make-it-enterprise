import type { IObjectFactory } from "./IObjectFactory.js";

export interface IFactoryBeanFactory {
  createFactoryBean(factoryBeanName: string): IObjectFactory<unknown>;
  getFactoryBeanFactoryName(): string;
  getFactoryBeanFactoryVersion(): string;
  getRegisteredFactoryBeanNames(): readonly string[];
}
