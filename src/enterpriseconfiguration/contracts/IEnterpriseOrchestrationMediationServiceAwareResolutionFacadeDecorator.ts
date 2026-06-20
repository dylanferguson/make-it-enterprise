import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseOrchestrationMediationService } from "./IEnterpriseOrchestrationMediationService.js";

export interface IEnterpriseOrchestrationMediationServiceAwareResolutionFacadeDecorator extends IFizzBuzzSingleValueResolutionFacade {
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getMediationService(): IEnterpriseOrchestrationMediationService;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  isDecoratorEnabled(): boolean;
}
