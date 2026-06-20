import type { IEnterpriseDivisibilityResolutionFacade } from "./IEnterpriseDivisibilityResolutionFacade.js";

export interface IEnterpriseDivisibilityResolutionFacadeDecorator extends IEnterpriseDivisibilityResolutionFacade {
  getWrappedFacade(): IEnterpriseDivisibilityResolutionFacade;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
}
