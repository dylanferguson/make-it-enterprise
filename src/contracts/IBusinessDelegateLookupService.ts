import type { IFizzBuzzServiceDelegate } from "./IFizzBuzzServiceDelegate.js";

export interface IBusinessDelegateLookupService {
  lookupDelegate(delegateJndiName: string): IFizzBuzzServiceDelegate;
  registerDelegate(jndiName: string, delegate: IFizzBuzzServiceDelegate): void;
  unregisterDelegate(jndiName: string): boolean;
  getAvailableDelegateNames(): readonly string[];
  getLookupServiceName(): string;
}
