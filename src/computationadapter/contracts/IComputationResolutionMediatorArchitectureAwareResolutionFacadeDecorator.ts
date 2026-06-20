import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseComputationResolutionMediatorArchitecture } from "./IEnterpriseComputationResolutionMediatorArchitecture.js";

export interface IComputationResolutionMediatorArchitectureAwareResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade
{
  getArchitecture(): IEnterpriseComputationResolutionMediatorArchitecture;
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  isDecoratorEnabled(): boolean;
}
