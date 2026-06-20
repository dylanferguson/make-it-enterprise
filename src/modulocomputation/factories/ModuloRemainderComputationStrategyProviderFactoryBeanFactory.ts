import type { IModuloRemainderComputationStrategyProvider } from "../contracts/index.js";
import { ServiceLocatorManagedModuloRemainderComputationStrategyProviderImpl } from "../impl/providers/ServiceLocatorManagedModuloRemainderComputationStrategyProviderImpl.js";

export class ModuloRemainderComputationStrategyProviderFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ModuloRemainderComputationStrategyProviderFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-MRC-PROVIDER-FBF";

  private static providerInstance: IModuloRemainderComputationStrategyProvider | null = null;
  private static factoryInitialized = false;

  static initializeFactory(): boolean {
    if (ModuloRemainderComputationStrategyProviderFactoryBeanFactory.factoryInitialized) {
      return false;
    }
    ModuloRemainderComputationStrategyProviderFactoryBeanFactory.factoryInitialized = true;
    return true;
  }

  static createProvider(): IModuloRemainderComputationStrategyProvider {
    if (ModuloRemainderComputationStrategyProviderFactoryBeanFactory.providerInstance === null) {
      ModuloRemainderComputationStrategyProviderFactoryBeanFactory.providerInstance =
        new ServiceLocatorManagedModuloRemainderComputationStrategyProviderImpl();
    }
    return ModuloRemainderComputationStrategyProviderFactoryBeanFactory.providerInstance;
  }

  static getProvider(): IModuloRemainderComputationStrategyProvider | null {
    return ModuloRemainderComputationStrategyProviderFactoryBeanFactory.providerInstance;
  }

  static getFactoryBeanName(): string {
    return ModuloRemainderComputationStrategyProviderFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ModuloRemainderComputationStrategyProviderFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
