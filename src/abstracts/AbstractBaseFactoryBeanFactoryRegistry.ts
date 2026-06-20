import type { IFactoryBeanFactoryRegistry } from "../contracts/IFactoryBeanFactoryRegistry.js";
import type { IFizzBuzzServiceDelegate } from "../contracts/IFizzBuzzServiceDelegate.js";

export abstract class AbstractBaseFactoryBeanFactoryRegistry implements IFactoryBeanFactoryRegistry {
  protected static readonly DEFAULT_REGISTRY_NAME = "DefaultFactoryBeanFactoryRegistry";
  protected static readonly DEFAULT_REGISTRY_VERSION = "1.0.0-ENTERPRISE";
  protected readonly factoryBeanRegistry: Map<string, { createDelegate(): IFizzBuzzServiceDelegate }> = new Map();

  abstract registerDelegateFactoryBean(jndiName: string, factoryBean: { createDelegate(): IFizzBuzzServiceDelegate }): void;
  abstract resolveDelegateFactoryBean(jndiName: string): { createDelegate(): IFizzBuzzServiceDelegate } | null;
  abstract getRegisteredFactoryBeanNames(): readonly string[];
  abstract getRegistryName(): string;
  abstract getRegistryVersion(): string;

  protected validateJndiName(jndiName: string): void {
    if (jndiName === null || jndiName === undefined || jndiName.trim().length === 0) {
      throw new Error(`[FactoryBeanFactoryRegistry] Invalid JNDI name: '${jndiName}'`);
    }
  }
}
