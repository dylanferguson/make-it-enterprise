import type { IEnterpriseDivisibilityResolutionFacade } from "../contracts/IEnterpriseDivisibilityResolutionFacade.js";
import type { IEnterpriseDivisibilityResolutionFacadeDecorator } from "../contracts/IEnterpriseDivisibilityResolutionFacadeDecorator.js";

export abstract class AbstractBaseEnterpriseDivisibilityResolutionFacadeDecorator
  implements IEnterpriseDivisibilityResolutionFacadeDecorator
{
  protected readonly wrappedFacade: IEnterpriseDivisibilityResolutionFacade;

  constructor(wrappedFacade: IEnterpriseDivisibilityResolutionFacade) {
    this.wrappedFacade = wrappedFacade;
  }

  abstract isDivisible(dividend: number, divisor: number): boolean;
  abstract getFacadeName(): string;
  abstract getFacadeVersion(): string;
  abstract getResolutionStrategyDescription(): string;
  abstract getDecoratorName(): string;
  abstract getDecoratorVersion(): string;

  getWrappedFacade(): IEnterpriseDivisibilityResolutionFacade {
    return this.wrappedFacade;
  }
}
