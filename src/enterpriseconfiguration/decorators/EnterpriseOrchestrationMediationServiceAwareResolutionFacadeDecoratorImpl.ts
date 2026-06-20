import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseOrchestrationMediationService } from "../contracts/IEnterpriseOrchestrationMediationService.js";
import type { IEnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecorator } from "../contracts/IEnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecorator.js";

export class EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorImpl
  implements IEnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecorator
{
  private static readonly DECORATOR_NAME = "EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorImpl";
  private static readonly DECORATOR_VERSION = "1.0.0-MEDIATION-DECORATOR";

  private readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;
  private readonly mediationService: IEnterpriseOrchestrationMediationService;
  private readonly enabled: boolean;

  constructor(
    wrappedFacade: IFizzBuzzSingleValueResolutionFacade,
    mediationService: IEnterpriseOrchestrationMediationService,
    enabled: boolean = true,
  ) {
    this.wrappedFacade = wrappedFacade;
    this.mediationService = mediationService;
    this.enabled = enabled;
  }

  resolveValue(value: number): string {
    if (!this.enabled) {
      return this.wrappedFacade.resolveValue(value);
    }
    return this.mediationService.mediateValueResolution(value, (v: number) =>
      this.wrappedFacade.resolveValue(v),
    );
  }

  resolveRange(start: number, end: number): readonly string[] {
    if (!this.enabled) {
      return this.wrappedFacade.resolveRange(start, end);
    }
    return this.mediationService.mediateRangeResolution(start, end, (s: number, e: number) =>
      this.wrappedFacade.resolveRange(s, e),
    );
  }

  getFacadeName(): string {
    return `${EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME}(${this.wrappedFacade.getFacadeName()})`;
  }

  getFacadeVersion(): string {
    return EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION;
  }

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade { return this.wrappedFacade; }
  getMediationService(): IEnterpriseOrchestrationMediationService { return this.mediationService; }
  getDecoratorName(): string { return EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorImpl.DECORATOR_NAME; }
  getDecoratorVersion(): string { return EnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecoratorImpl.DECORATOR_VERSION; }
  isDecoratorEnabled(): boolean { return this.enabled; }
}
