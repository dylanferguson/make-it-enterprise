import type { IEnterpriseDecoratorChainConfigurationRegistry } from "../contracts/IEnterpriseDecoratorChainConfigurationRegistry.js";
import { FizzBuzzEnterpriseDecoratorChainConfigurationRegistryImpl } from "../registry/FizzBuzzEnterpriseDecoratorChainConfigurationRegistryImpl.js";

export class EnterpriseDecoratorChainConfigurationRegistryFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseDecoratorChainConfigurationRegistryFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-REGISTRY-FACTORY";

  private static registrySingleton: IEnterpriseDecoratorChainConfigurationRegistry | null = null;

  static createRegistry(profileName: string = "STANDARD"): IEnterpriseDecoratorChainConfigurationRegistry {
    if (EnterpriseDecoratorChainConfigurationRegistryFactoryBeanFactory.registrySingleton === null) {
      EnterpriseDecoratorChainConfigurationRegistryFactoryBeanFactory.registrySingleton =
        new FizzBuzzEnterpriseDecoratorChainConfigurationRegistryImpl(profileName);
    }
    return EnterpriseDecoratorChainConfigurationRegistryFactoryBeanFactory.registrySingleton;
  }

  static getRegistry(): IEnterpriseDecoratorChainConfigurationRegistry | null {
    return EnterpriseDecoratorChainConfigurationRegistryFactoryBeanFactory.registrySingleton;
  }

  static resetRegistry(): void {
    EnterpriseDecoratorChainConfigurationRegistryFactoryBeanFactory.registrySingleton = null;
  }

  static isRegistryInitialized(): boolean {
    return EnterpriseDecoratorChainConfigurationRegistryFactoryBeanFactory.registrySingleton !== null;
  }

  static getFactoryBeanName(): string {
    return EnterpriseDecoratorChainConfigurationRegistryFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseDecoratorChainConfigurationRegistryFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
