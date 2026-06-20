import type { IServiceLocatorManagedBusinessDelegateProxy } from "../contracts/IServiceLocatorManagedBusinessDelegateProxy.js";
import type { IEnterpriseFizzBuzzPublicApiResolutionDelegate } from "../contracts/IEnterpriseFizzBuzzPublicApiResolutionDelegate.js";

export abstract class AbstractBaseServiceLocatorManagedBusinessDelegateProxy
  implements IServiceLocatorManagedBusinessDelegateProxy
{
  private static readonly DEFAULT_PROXY_VENDOR = "FizzBuzzEnterpriseProxyArchitectureGroup";

  abstract proxiedResolveSingleValue(value: number): string;
  abstract proxiedResolveRange(start: number, end: number): readonly string[];
  abstract getProxyName(): string;
  abstract getProxyVersion(): string;
  abstract getProxiedDelegate(): IEnterpriseFizzBuzzPublicApiResolutionDelegate;

  getProxyStatusSummary(): string {
    return `${this.getProxyName()} v${this.getProxyVersion()} [proxied=${this.getProxiedDelegate().getDelegateName()}]`;
  }
}
