import type { IFizzBuzzEnterpriseBusinessDelegate } from "../contracts/IFizzBuzzEnterpriseBusinessDelegate.js";
import type { IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext } from "../contracts/IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext.js";

export abstract class AbstractBaseFizzBuzzEnterpriseBusinessDelegate
  implements IFizzBuzzEnterpriseBusinessDelegate
{
  protected static readonly DEFAULT_IMPLEMENTATION_VENDOR = "FizzBuzzEnterpriseArchitectureGroup";
  private static readonly DEFAULT_VENDOR = "FizzBuzzEnterpriseArchitectureGroup";

  protected initialized: boolean = false;
  protected initializationTimestamp: number = 0;
  protected serviceLocatorAwareContext: IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext | null = null;

  abstract delegateSingleValueResolution(value: number): string;
  abstract delegateRangeResolution(start: number, end: number): readonly string[];
  abstract getDelegateName(): string;
  abstract getDelegateVersion(): string;

  getDelegateImplementationVendor(): string {
    return AbstractBaseFizzBuzzEnterpriseBusinessDelegate.DEFAULT_IMPLEMENTATION_VENDOR;
  }

  isDelegateInitialized(): boolean {
    return this.initialized && this.initializationTimestamp > 0;
  }

  getDelegateContextSummary(): string {
    return `${this.getDelegateName()} v${this.getDelegateVersion()} [vendor=${this.getDelegateImplementationVendor()}, initialized=${this.isDelegateInitialized()}]`;
  }

  protected markInitialized(): void {
    this.initialized = true;
    this.initializationTimestamp = Date.now();
  }

  setServiceLocatorAwareContext(context: IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext): void {
    this.serviceLocatorAwareContext = context;
  }

  getServiceLocatorAwareContext(): IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext | null {
    return this.serviceLocatorAwareContext;
  }
}
