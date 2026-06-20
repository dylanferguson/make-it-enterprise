import { AbstractBaseFizzBuzzEnterpriseBusinessDelegate } from "../../abstracts/AbstractBaseFizzBuzzEnterpriseBusinessDelegate.js";
import type { IFizzBuzzEnterpriseBusinessDelegate } from "../../contracts/IFizzBuzzEnterpriseBusinessDelegate.js";
import type { IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext } from "../../contracts/IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext.js";
import type { IFizzBuzzResolutionStrategyChainOfResponsibilityManager } from "../../contracts/IFizzBuzzResolutionStrategyChainOfResponsibilityHandler.js";
import type { IServiceLocator } from "../../contracts/IServiceLocator.js";

export class ServiceLocatorManagedFizzBuzzEnterpriseBusinessDelegateImpl
  extends AbstractBaseFizzBuzzEnterpriseBusinessDelegate
  implements IFizzBuzzEnterpriseBusinessDelegate
{
  private static readonly DELEGATE_NAME = "ServiceLocatorManagedFizzBuzzEnterpriseBusinessDelegate";
  private static readonly DELEGATE_VERSION = "1.0.0-BUSINESS-DELEGATE-SERVICE-LOCATOR-MANAGED";

  constructor(serviceLocatorAwareContext: IFizzBuzzEnterpriseBusinessDelegateServiceLocatorAwareContext) {
    super();
    this.serviceLocatorAwareContext = serviceLocatorAwareContext;
    this.markInitialized();
  }

  override delegateSingleValueResolution(value: number): string {
    if (!this.isDelegateInitialized()) {
      throw new Error(`[${ServiceLocatorManagedFizzBuzzEnterpriseBusinessDelegateImpl.DELEGATE_NAME}] Business delegate not initialized for value: ${value}`);
    }
    const context = this.serviceLocatorAwareContext!;
    const chainOfResponsibilityManager = context.getStrategyChainOfResponsibilityManager();
    const publicApiDelegate = context.getPublicApiDelegate();
    const governanceFacade = context.getGovernanceEnforcementFacade();
    return chainOfResponsibilityManager.resolveThroughChain(
      value,
      (v: number) =>
        governanceFacade.enforceComputation(v, (w: number) =>
          publicApiDelegate.resolveSingleValue(w),
        ),
    );
  }

  override delegateRangeResolution(start: number, end: number): readonly string[] {
    if (!this.isDelegateInitialized()) {
      throw new Error(`[${ServiceLocatorManagedFizzBuzzEnterpriseBusinessDelegateImpl.DELEGATE_NAME}] Business delegate not initialized for range: ${start}-${end}`);
    }
    const results: string[] = [];
    for (let i = start; i <= end; i++) {
      results.push(this.delegateSingleValueResolution(i));
    }
    return results;
  }

  override getDelegateName(): string {
    return ServiceLocatorManagedFizzBuzzEnterpriseBusinessDelegateImpl.DELEGATE_NAME;
  }

  override getDelegateVersion(): string {
    return ServiceLocatorManagedFizzBuzzEnterpriseBusinessDelegateImpl.DELEGATE_VERSION;
  }
}
