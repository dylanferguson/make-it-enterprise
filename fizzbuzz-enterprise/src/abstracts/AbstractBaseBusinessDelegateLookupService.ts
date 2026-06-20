import type { IBusinessDelegateLookupService } from "../contracts/IBusinessDelegateLookupService.js";
import type { IFizzBuzzServiceDelegate } from "../contracts/IFizzBuzzServiceDelegate.js";

export abstract class AbstractBaseBusinessDelegateLookupService implements IBusinessDelegateLookupService {
  protected static readonly DEFAULT_LOOKUP_SERVICE_NAME = "DefaultBusinessDelegateLookupService";
  protected readonly delegateRegistry: Map<string, IFizzBuzzServiceDelegate> = new Map();

  abstract lookupDelegate(delegateJndiName: string): IFizzBuzzServiceDelegate;
  abstract registerDelegate(jndiName: string, delegate: IFizzBuzzServiceDelegate): void;
  abstract unregisterDelegate(jndiName: string): boolean;
  abstract getAvailableDelegateNames(): readonly string[];
  abstract getLookupServiceName(): string;

  protected validateJndiName(jndiName: string): void {
    if (jndiName === null || jndiName === undefined || jndiName.trim().length === 0) {
      throw new Error(`[BusinessDelegateLookupService] Invalid JNDI name: '${jndiName}'`);
    }
  }
}
