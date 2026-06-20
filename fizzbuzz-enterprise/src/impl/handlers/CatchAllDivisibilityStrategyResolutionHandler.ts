import { AbstractBaseDivisibilityStrategyResolutionHandler } from "../../abstracts/AbstractBaseDivisibilityStrategyResolutionHandler.js";
import type { IFizzBuzzEvaluationContext } from "../../contracts/IFizzBuzzEvaluationContext.js";

export class CatchAllDivisibilityStrategyResolutionHandler extends AbstractBaseDivisibilityStrategyResolutionHandler {
  private static readonly HANDLER_NAME = "CatchAllDivisibilityStrategyResolutionHandler";
  private static readonly HANDLER_PRIORITY = 0;

  override handleDivisibilityResolution(
    dividend: number,
    divisor: number,
  ): {
    resolved: boolean;
    isDivisible: boolean;
    context: IFizzBuzzEvaluationContext | null;
  } {
    this.validateOperands(dividend, divisor);

    const quotient = Math.trunc(dividend / divisor);
    const remainder = dividend - quotient * divisor;
    const isDivisible = remainder === 0;

    return {
      resolved: true,
      isDivisible,
      context: null,
    };
  }

  override getHandlerName(): string {
    return CatchAllDivisibilityStrategyResolutionHandler.HANDLER_NAME;
  }

  override getHandlerPriority(): number {
    return CatchAllDivisibilityStrategyResolutionHandler.HANDLER_PRIORITY;
  }
}
