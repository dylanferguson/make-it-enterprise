import type { IFizzBuzzEvaluationContext } from "./IFizzBuzzEvaluationContext.js";

export interface IDivisibilityStrategyResolutionHandler {
  setNext(
    handler: IDivisibilityStrategyResolutionHandler,
  ): IDivisibilityStrategyResolutionHandler;
  handleDivisibilityResolution(
    dividend: number,
    divisor: number,
  ): {
    resolved: boolean;
    isDivisible: boolean;
    context: IFizzBuzzEvaluationContext | null;
  };
  getHandlerName(): string;
  getHandlerPriority(): number;
}
