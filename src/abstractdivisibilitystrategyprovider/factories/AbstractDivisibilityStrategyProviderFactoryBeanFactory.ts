import type { IAbstractDivisibilityStrategyProvider } from "../contracts/IAbstractDivisibilityStrategyProvider.js";
import { AbstractDivisibilityStrategyProviderImpl } from "../impl/AbstractDivisibilityStrategyProviderImpl.js";

export class AbstractDivisibilityStrategyProviderFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "AbstractDivisibilityStrategyProviderFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-ADSP-FBF";

  private static providerSingleton: IAbstractDivisibilityStrategyProvider | null = null;
  private static factoryInitialized = false;

  static initializeProviderInfrastructure(): IAbstractDivisibilityStrategyProvider {
    if (AbstractDivisibilityStrategyProviderFactoryBeanFactory.factoryInitialized) {
      return AbstractDivisibilityStrategyProviderFactoryBeanFactory.providerSingleton!;
    }
    AbstractDivisibilityStrategyProviderFactoryBeanFactory.providerSingleton =
      new AbstractDivisibilityStrategyProviderImpl();
    AbstractDivisibilityStrategyProviderFactoryBeanFactory.factoryInitialized = true;
    return AbstractDivisibilityStrategyProviderFactoryBeanFactory.providerSingleton;
  }

  static getProvider(): IAbstractDivisibilityStrategyProvider | null {
    return AbstractDivisibilityStrategyProviderFactoryBeanFactory.providerSingleton;
  }

  static isInfrastructureInitialized(): boolean {
    return AbstractDivisibilityStrategyProviderFactoryBeanFactory.factoryInitialized;
  }

  static resetInfrastructure(): void {
    AbstractDivisibilityStrategyProviderFactoryBeanFactory.providerSingleton = null;
    AbstractDivisibilityStrategyProviderFactoryBeanFactory.factoryInitialized = false;
  }

  static getFactoryBeanName(): string {
    return AbstractDivisibilityStrategyProviderFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return AbstractDivisibilityStrategyProviderFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
