import type { IFizzBuzzSingleValueResolutionFacade } from "../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IAbstractDivisibilityStrategyAwareResolutionFacadeDecorator } from "../contracts/IAbstractDivisibilityStrategyAwareResolutionFacadeDecorator.js";
import type { IAbstractDivisibilityStrategyProvider } from "../abstractdivisibilitystrategyprovider/contracts/IAbstractDivisibilityStrategyProvider.js";

export abstract class AbstractBaseAbstractDivisibilityStrategyAwareResolutionFacadeDecorator
  implements IAbstractDivisibilityStrategyAwareResolutionFacadeDecorator
{
  protected readonly wrappedFacade: IFizzBuzzSingleValueResolutionFacade;

  constructor(wrappedFacade: IFizzBuzzSingleValueResolutionFacade) {
    this.wrappedFacade = wrappedFacade;
  }

  abstract resolveValue(value: number): string;
  abstract resolveRange(start: number, end: number): readonly string[];
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract getAbstractDivisibilityStrategyProvider(): IAbstractDivisibilityStrategyProvider;
  abstract getDivisibilityEvaluationCount(): number;

  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade {
    return this.wrappedFacade;
  }
}
