import type { IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator } from "./index.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";

export interface IExecutionCoordinatorAwareResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade
{
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getExecutionCoordinator(): IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator;
  isCoordinatorEngaged(): boolean;
}
