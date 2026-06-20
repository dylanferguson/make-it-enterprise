import type { IEnterpriseFizzBuzzPublicApiResolutionDelegate } from "../../../contracts/IEnterpriseFizzBuzzPublicApiResolutionDelegate.js";
import { InfrastructureManagedEnterpriseFizzBuzzPublicApiResolutionDelegateImpl } from "../InfrastructureManagedEnterpriseFizzBuzzPublicApiResolutionDelegateImpl.js";

export class EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PUBLIC-API-DELEGATE-FACTORY-BEAN";

  private static delegateSingleton: IEnterpriseFizzBuzzPublicApiResolutionDelegate | null = null;

  static createDelegate(): IEnterpriseFizzBuzzPublicApiResolutionDelegate {
    if (EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory.delegateSingleton === null) {
      EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory.delegateSingleton =
        new InfrastructureManagedEnterpriseFizzBuzzPublicApiResolutionDelegateImpl();
    }
    return EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory.delegateSingleton;
  }

  static getDelegate(): IEnterpriseFizzBuzzPublicApiResolutionDelegate | null {
    return EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory.delegateSingleton;
  }

  static isDelegateInitialized(): boolean {
    return EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory.delegateSingleton !== null &&
      EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory.delegateSingleton.isDelegateInitialized();
  }

  static resetDelegate(): void {
    EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory.delegateSingleton = null;
  }

  static getFactoryBeanName(): string {
    return EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseFizzBuzzPublicApiResolutionDelegateFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
