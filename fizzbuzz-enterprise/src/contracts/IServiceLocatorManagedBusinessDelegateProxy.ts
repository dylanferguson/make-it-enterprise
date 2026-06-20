import type { IEnterpriseFizzBuzzPublicApiResolutionDelegate } from "./IEnterpriseFizzBuzzPublicApiResolutionDelegate.js";

export interface IServiceLocatorManagedBusinessDelegateProxy {
  proxiedResolveSingleValue(value: number): string;
  proxiedResolveRange(start: number, end: number): readonly string[];
  getProxyName(): string;
  getProxyVersion(): string;
  getProxiedDelegate(): IEnterpriseFizzBuzzPublicApiResolutionDelegate;
  getProxyStatusSummary(): string;
}
