import type { IDivisibilityStrategyResolutionHandler } from "../contracts/IDivisibilityStrategyResolutionHandler.js";
import type { IFizzBuzzEvaluationContext } from "../contracts/IFizzBuzzEvaluationContext.js";

export abstract class AbstractBaseDivisibilityStrategyResolutionHandler
  implements IDivisibilityStrategyResolutionHandler
{
  protected nextHandler: IDivisibilityStrategyResolutionHandler | null = null;

  setNext(
    handler: IDivisibilityStrategyResolutionHandler,
  ): IDivisibilityStrategyResolutionHandler {
    this.nextHandler = handler;
    return handler;
  }

  abstract handleDivisibilityResolution(
    dividend: number,
    divisor: number,
  ): {
    resolved: boolean;
    isDivisible: boolean;
    context: IFizzBuzzEvaluationContext | null;
  };
  abstract getHandlerName(): string;
  abstract getHandlerPriority(): number;

  protected delegateToNext(
    dividend: number,
    divisor: number,
  ): {
    resolved: boolean;
    isDivisible: boolean;
    context: IFizzBuzzEvaluationContext | null;
  } {
    if (this.nextHandler === null) {
      return {
        resolved: false,
        isDivisible: false,
        context: null,
      };
    }
    return this.nextHandler.handleDivisibilityResolution(dividend, divisor);
  }

  protected validateOperands(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(
        `[${this.getHandlerName()}] Dividend must be finite, received: ${dividend}`,
      );
    }
    if (!Number.isFinite(divisor)) {
      throw new Error(
        `[${this.getHandlerName()}] Divisor must be finite, received: ${divisor}`,
      );
    }
    if (divisor === 0) {
      throw new Error(
        `[${this.getHandlerName()}] Division by zero is not permitted`,
      );
    }
  }
}
