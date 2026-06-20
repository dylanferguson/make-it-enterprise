import type { IFizzBuzzSingleValueResolutionFacade } from "./IFizzBuzzSingleValueResolutionFacade.js";
import type { IComputationRequestInterceptionFilterChain } from "./IComputationRequestInterceptionFilter.js";

export interface IInterceptionFilterChainResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade
{
  getDecoratedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getInterceptionFilterChain(): IComputationRequestInterceptionFilterChain;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  isFilterChainEnabled(): boolean;
}
