import type { IEnterpriseStrategyLookupService } from "../contracts/IEnterpriseStrategyLookupService.js";
import { DefaultEnterpriseStrategyLookupServiceImpl } from "../impl/DefaultEnterpriseStrategyLookupServiceImpl.js";

export class EnterpriseStrategyLookupServiceFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseStrategyLookupServiceFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-LOOKUP-SERVICE-FACTORY";

  private static lookupServiceSingleton: IEnterpriseStrategyLookupService | null = null;
  private static factoryInitialized = false;

  static initializeLookupService(): IEnterpriseStrategyLookupService {
    if (EnterpriseStrategyLookupServiceFactoryBeanFactory.factoryInitialized) {
      return EnterpriseStrategyLookupServiceFactoryBeanFactory.lookupServiceSingleton!;
    }
    EnterpriseStrategyLookupServiceFactoryBeanFactory.lookupServiceSingleton =
      new DefaultEnterpriseStrategyLookupServiceImpl();
    EnterpriseStrategyLookupServiceFactoryBeanFactory.factoryInitialized = true;
    return EnterpriseStrategyLookupServiceFactoryBeanFactory.lookupServiceSingleton;
  }

  static getLookupService(): IEnterpriseStrategyLookupService | null {
    return EnterpriseStrategyLookupServiceFactoryBeanFactory.lookupServiceSingleton;
  }

  static isInfrastructureInitialized(): boolean {
    return EnterpriseStrategyLookupServiceFactoryBeanFactory.factoryInitialized;
  }

  static resetInfrastructure(): void {
    EnterpriseStrategyLookupServiceFactoryBeanFactory.lookupServiceSingleton = null;
    EnterpriseStrategyLookupServiceFactoryBeanFactory.factoryInitialized = false;
  }

  static getFactoryBeanName(): string {
    return EnterpriseStrategyLookupServiceFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseStrategyLookupServiceFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
