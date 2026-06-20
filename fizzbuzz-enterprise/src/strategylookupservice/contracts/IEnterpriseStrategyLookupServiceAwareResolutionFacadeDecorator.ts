import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseStrategyLookupService } from "./IEnterpriseStrategyLookupService.js";

export interface IEnterpriseStrategyLookupServiceAwareResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade {
  getWrappedFacadeName(): string;
  getLookupService(): IEnterpriseStrategyLookupService;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  isDecoratorEnabled(): boolean;
  getLookupServiceRegistrationCount(): number;
}
