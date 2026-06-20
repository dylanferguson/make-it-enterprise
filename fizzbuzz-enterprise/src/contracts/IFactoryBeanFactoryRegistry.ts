import type { IFizzBuzzServiceDelegate } from "./IFizzBuzzServiceDelegate.js";

export interface IFactoryBeanFactoryRegistry {
  registerDelegateFactoryBean(jndiName: string, factoryBean: { createDelegate(): IFizzBuzzServiceDelegate }): void;
  resolveDelegateFactoryBean(jndiName: string): { createDelegate(): IFizzBuzzServiceDelegate } | null;
  getRegisteredFactoryBeanNames(): readonly string[];
  getRegistryName(): string;
  getRegistryVersion(): string;
}
