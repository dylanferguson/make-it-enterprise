import type { IFizzBuzzSingleValueResolutionFacade } from "../../contracts/IFizzBuzzSingleValueResolutionFacade.js";
import type { IEnterpriseDivisibilityEvaluationInterceptorAdapter } from "./IEnterpriseDivisibilityEvaluationInterceptorAdapter.js";

export interface IEnterpriseDivisibilityEvaluationInterceptorAdapterResolutionFacadeDecorator
  extends IFizzBuzzSingleValueResolutionFacade
{
  getWrappedFacade(): IFizzBuzzSingleValueResolutionFacade;
  getInterceptorAdapter(): IEnterpriseDivisibilityEvaluationInterceptorAdapter;
  getDecoratorName(): string;
  getDecoratorVersion(): string;
  isInterceptorAdapterEnabled(): boolean;
  getDecoratorInterceptionCount(): number;
}
