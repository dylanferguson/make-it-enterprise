import type { IEnterpriseFizzBuzzPublicApiResolutionDelegate } from "../../../contracts/IEnterpriseFizzBuzzPublicApiResolutionDelegate.js";
import type { IServiceLocatorManagedBusinessDelegateProxy } from "../../../contracts/IServiceLocatorManagedBusinessDelegateProxy.js";
import type { IServiceLocator } from "../../../contracts/IServiceLocator.js";
import { ServiceLocatorManagedBusinessDelegateProxyImpl } from "../ServiceLocatorManagedBusinessDelegateProxyImpl.js";
import { ServiceLocatorFactoryBeanFactory } from "../../factories/ServiceLocatorFactoryBean.js";

export class ServiceLocatorManagedBusinessDelegateProxyFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "ServiceLocatorManagedBusinessDelegateProxyFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PROXY-FACTORY-BEAN";

  private static proxySingleton: IServiceLocatorManagedBusinessDelegateProxy | null = null;

  static createProxy(
    proxiedDelegate: IEnterpriseFizzBuzzPublicApiResolutionDelegate,
    serviceLocator?: IServiceLocator,
  ): IServiceLocatorManagedBusinessDelegateProxy {
    if (ServiceLocatorManagedBusinessDelegateProxyFactoryBeanFactory.proxySingleton === null) {
      ServiceLocatorManagedBusinessDelegateProxyFactoryBeanFactory.proxySingleton =
        new ServiceLocatorManagedBusinessDelegateProxyImpl(
          proxiedDelegate,
          serviceLocator ?? ServiceLocatorFactoryBeanFactory.createFactoryBean().createServiceLocator(),
        );
    }
    return ServiceLocatorManagedBusinessDelegateProxyFactoryBeanFactory.proxySingleton;
  }

  static getProxy(): IServiceLocatorManagedBusinessDelegateProxy | null {
    return ServiceLocatorManagedBusinessDelegateProxyFactoryBeanFactory.proxySingleton;
  }

  static resetProxy(): void {
    ServiceLocatorManagedBusinessDelegateProxyFactoryBeanFactory.proxySingleton = null;
  }

  static getFactoryBeanName(): string {
    return ServiceLocatorManagedBusinessDelegateProxyFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return ServiceLocatorManagedBusinessDelegateProxyFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
