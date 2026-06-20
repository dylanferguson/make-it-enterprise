import type { IAbstractDivisibilityStrategyProvider } from "../abstractdivisibilitystrategyprovider/contracts/IAbstractDivisibilityStrategyProvider.js";
import type { IFizzBuzzSingleValueResolutionFacade } from "./IFizzBuzzSingleValueResolutionFacade.js";

export interface IAbstractDivisibilityStrategyAwareResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade {
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getAbstractDivisibilityStrategyProvider(): IAbstractDivisibilityStrategyProvider;
  getDivisibilityEvaluationCount(): number;
}
