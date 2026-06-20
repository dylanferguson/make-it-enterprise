import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export interface IEnterpriseTransactionContextPropagatingResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade
{
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getTransactionAttributeType(): string;
}
