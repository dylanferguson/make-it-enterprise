import type { IFizzBuzzEnterpriseBusinessDelegate } from "../../../contracts/IFizzBuzzEnterpriseBusinessDelegate.js";
import type { IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext } from "../../../contracts/IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext.js";
import { ServiceLocatorManagedFizzBuzzEnterpriseBusinessDelegateImpl } from "../ServiceLocatorManagedFizzBuzzEnterpriseBusinessDelegateImpl.js";

export class FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-BUSINESS-DELEGATE-FACTORY-BEAN";

  private static delegateSingleton: IFizzBuzzEnterpriseBusinessDelegate | null = null;
  private static serviceLocatorAwareContext: IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext | null = null;

  static setServiceLocatorAwareContext(context: IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext): void {
    FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.serviceLocatorAwareContext = context;
  }

  static createBusinessDelegate(): IFizzBuzzEnterpriseBusinessDelegate {
    if (FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.delegateSingleton === null) {
      if (FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.serviceLocatorAwareContext === null) {
        throw new Error(`[${FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.FACTORY_BEAN_NAME}] ServiceLocatorAwareContext must be set before creating business delegate`);
      }
      FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.delegateSingleton =
        new ServiceLocatorManagedFizzBuzzEnterpriseBusinessDelegateImpl(
          FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.serviceLocatorAwareContext,
        );
    }
    return FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.delegateSingleton;
  }

  static getBusinessDelegate(): IFizzBuzzEnterpriseBusinessDelegate | null {
    return FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.delegateSingleton;
  }

  static isDelegateInitialized(): boolean {
    return FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.delegateSingleton !== null &&
      FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.delegateSingleton.isDelegateInitialized();
  }

  static resetDelegate(): void {
    FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.delegateSingleton = null;
  }

  static getFactoryBeanName(): string {
    return FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return FizzBuzzEnterpriseBusinessDelegateFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
