import { AbstractBaseServiceLocatorManagedBusinessDelegateProxy } from "../../abstracts/AbstractBaseServiceLocatorManagedBusinessDelegateProxy.js";
import type { IServiceLocatorManagedBusinessDelegateProxy } from "../../contracts/IServiceLocatorManagedBusinessDelegateProxy.js";
import type { IEnterpriseFizzBuzzPublicApiResolutionDelegate } from "../../contracts/IEnterpriseFizzBuzzPublicApiResolutionDelegate.js";
import type { IServiceLocator } from "../../contracts/IServiceLocator.js";
import { ServiceLocatorFactoryBeanFactory } from "../factories/ServiceLocatorFactoryBean.js";

export class ServiceLocatorManagedBusinessDelegateProxyImpl
  extends AbstractBaseServiceLocatorManagedBusinessDelegateProxy
  implements IServiceLocatorManagedBusinessDelegateProxy
{
  private static readonly PROXY_NAME = "ServiceLocatorManagedBusinessDelegateProxy";
  private static readonly PROXY_VERSION = "1.0.0-PROXY-SERVICE-LOCATOR-MANAGED";

  private readonly proxiedDelegate: IEnterpriseFizzBuzzPublicApiResolutionDelegate;
  private readonly serviceLocator: IServiceLocator;
  private readonly serviceLocatorFactoryBeanName: string;

  constructor(
    proxiedDelegate: IEnterpriseFizzBuzzPublicApiResolutionDelegate,
    serviceLocator?: IServiceLocator,
    serviceLocatorFactoryBeanName?: string,
  ) {
    super();
    this.proxiedDelegate = proxiedDelegate;
    this.serviceLocator = serviceLocator ?? ServiceLocatorFactoryBeanFactory.createFactoryBean().createServiceLocator();
    this.serviceLocatorFactoryBeanName = serviceLocatorFactoryBeanName ?? "DefaultServiceLocatorFactoryBean";
  }

  override proxiedResolveSingleValue(value: number): string {
    return this.proxiedDelegate.resolveSingleValue(value);
  }

  override proxiedResolveRange(start: number, end: number): readonly string[] {
    return this.proxiedDelegate.resolveRange(start, end);
  }

  override getProxyName(): string {
    return ServiceLocatorManagedBusinessDelegateProxyImpl.PROXY_NAME;
  }

  override getProxyVersion(): string {
    return ServiceLocatorManagedBusinessDelegateProxyImpl.PROXY_VERSION;
  }

  override getProxiedDelegate(): IEnterpriseFizzBuzzPublicApiResolutionDelegate {
    return this.proxiedDelegate;
  }

  getServiceLocator(): IServiceLocator {
    return this.serviceLocator;
  }

  getServiceLocatorFactoryBeanName(): string {
    return this.serviceLocatorFactoryBeanName;
  }
}
