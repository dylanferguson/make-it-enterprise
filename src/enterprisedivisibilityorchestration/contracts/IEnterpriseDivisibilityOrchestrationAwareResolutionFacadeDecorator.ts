import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseDivisibilityOrchestrationInvoker } from "./IEnterpriseDivisibilityOrchestrationInvoker.js";

export interface IEnterpriseDivisibilityOrchestrationAwareResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade
{
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getInvoker(): IEnterpriseDivisibilityOrchestrationInvoker;
  isDecoratorEnabled(): boolean;
}
