import { AbstractBaseBusinessDelegateLookupService } from "../../abstracts/AbstractBaseBusinessDelegateLookupService.js";
import type { IFizzBuzzServiceDelegate } from "../../contracts/IFizzBuzzServiceDelegate.js";

export class BusinessDelegateLookupServiceImpl extends AbstractBaseBusinessDelegateLookupService {
  private static readonly LOOKUP_SERVICE_NAME = "FizzBuzzBusinessDelegateLookupService";

  override getLookupServiceName(): string {
    return BusinessDelegateLookupServiceImpl.LOOKUP_SERVICE_NAME;
  }

  override lookupDelegate(delegateJndiName: string): IFizzBuzzServiceDelegate {
    this.validateJndiName(delegateJndiName);
    const delegate = this.delegateRegistry.get(delegateJndiName);
    if (delegate === undefined) {
      throw new Error(
        `[${this.getLookupServiceName()}] No delegate registered for JNDI name: '${delegateJndiName}'`,
      );
    }
    return delegate;
  }

  override registerDelegate(jndiName: string, delegate: IFizzBuzzServiceDelegate): void {
    this.validateJndiName(jndiName);
    if (delegate === null || delegate === undefined) {
      throw new Error(`[${this.getLookupServiceName()}] Cannot register null delegate for JNDI name: '${jndiName}'`);
    }
    this.delegateRegistry.set(jndiName, delegate);
  }

  override unregisterDelegate(jndiName: string): boolean {
    this.validateJndiName(jndiName);
    return this.delegateRegistry.delete(jndiName);
  }

  override getAvailableDelegateNames(): readonly string[] {
    return Array.from(this.delegateRegistry.keys());
  }
}
