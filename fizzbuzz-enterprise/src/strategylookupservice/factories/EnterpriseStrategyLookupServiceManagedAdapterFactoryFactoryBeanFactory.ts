import type { IEnterpriseStrategyLookupServiceManagedAdapterFactory } from "../contracts/IEnterpriseStrategyLookupServiceManagedAdapterFactory.js";
import { DefaultEnterpriseStrategyLookupServiceManagedAdapterFactoryImpl } from "../impl/DefaultEnterpriseStrategyLookupServiceManagedAdapterFactoryImpl.js";

export class EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ADAPTER-FACTORY-FBF";

  private static adapterFactorySingleton: IEnterpriseStrategyLookupServiceManagedAdapterFactory | null = null;
  private static factoryInitialized = false;

  static initializeAdapterFactory(): IEnterpriseStrategyLookupServiceManagedAdapterFactory {
    if (EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory.factoryInitialized) {
      return EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory.adapterFactorySingleton!;
    }
    EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory.adapterFactorySingleton =
      new DefaultEnterpriseStrategyLookupServiceManagedAdapterFactoryImpl();
    EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory.factoryInitialized = true;
    return EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory.adapterFactorySingleton;
  }

  static getAdapterFactory(): IEnterpriseStrategyLookupServiceManagedAdapterFactory | null {
    return EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory.adapterFactorySingleton;
  }

  static isInfrastructureInitialized(): boolean {
    return EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory.factoryInitialized;
  }

  static resetInfrastructure(): void {
    EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory.adapterFactorySingleton = null;
    EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory.factoryInitialized = false;
  }

  static getFactoryBeanName(): string {
    return EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseStrategyLookupServiceManagedAdapterFactoryFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
