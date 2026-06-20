import type { IFizzBuzzSingleValueResolutionFacade } from "./IFizzBuzzSingleValueResolutionFacade.js";

export interface IValidationAwareResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade {
  getDecoratedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  isValidationEnabled(): boolean;
}
