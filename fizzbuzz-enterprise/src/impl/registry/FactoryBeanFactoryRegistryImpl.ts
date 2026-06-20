import { AbstractBaseFactoryBeanFactoryRegistry } from "../../abstracts/AbstractBaseFactoryBeanFactoryRegistry.js";
import type { IFizzBuzzServiceDelegate } from "../../contracts/IFizzBuzzServiceDelegate.js";

export class FactoryBeanFactoryRegistryImpl extends AbstractBaseFactoryBeanFactoryRegistry {
  private static readonly REGISTRY_NAME = "FizzBuzzFactoryBeanFactoryRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-FACTORY-REGISTRY";

  override getRegistryName(): string {
    return FactoryBeanFactoryRegistryImpl.REGISTRY_NAME;
  }

  override getRegistryVersion(): string {
    return FactoryBeanFactoryRegistryImpl.REGISTRY_VERSION;
  }

  override registerDelegateFactoryBean(
    jndiName: string,
    factoryBean: { createDelegate(): IFizzBuzzServiceDelegate },
  ): void {
    this.validateJndiName(jndiName);
    if (factoryBean === null || factoryBean === undefined) {
      throw new Error(`[${this.getRegistryName()}] Cannot register null factory bean for JNDI name: '${jndiName}'`);
    }
    this.factoryBeanRegistry.set(jndiName, factoryBean);
  }

  override resolveDelegateFactoryBean(
    jndiName: string,
  ): { createDelegate(): IFizzBuzzServiceDelegate } | null {
    this.validateJndiName(jndiName);
    const factoryBean = this.factoryBeanRegistry.get(jndiName);
    return factoryBean ?? null;
  }

  override getRegisteredFactoryBeanNames(): readonly string[] {
    return Array.from(this.factoryBeanRegistry.keys());
  }
}
