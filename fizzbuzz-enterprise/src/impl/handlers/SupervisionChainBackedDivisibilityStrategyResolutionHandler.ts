import { AbstractBaseDivisibilityStrategyResolutionHandler } from "../../abstracts/AbstractBaseDivisibilityStrategyResolutionHandler.js";
import type { IDivisibilityEvaluationSupervisionChain } from "../../contracts/IDivisibilityEvaluationSupervisionChain.js";
import type { IFizzBuzzEvaluationContext } from "../../contracts/IFizzBuzzEvaluationContext.js";

export class SupervisionChainBackedDivisibilityStrategyResolutionHandler extends AbstractBaseDivisibilityStrategyResolutionHandler {
  private static readonly HANDLER_NAME = "SupervisionChainBackedDivisibilityStrategyResolutionHandler";
  private static readonly HANDLER_PRIORITY = 150;

  private readonly supervisionChain: IDivisibilityEvaluationSupervisionChain;

  constructor(supervisionChain: IDivisibilityEvaluationSupervisionChain) {
    super();
    this.supervisionChain = supervisionChain;
  }

  override handleDivisibilityResolution(
    dividend: number,
    divisor: number,
  ): {
    resolved: boolean;
    isDivisible: boolean;
    context: IFizzBuzzEvaluationContext | null;
  } {
    this.validateOperands(dividend, divisor);

    const isDivisible = this.supervisionChain.evaluate(dividend, divisor);

    return {
      resolved: isDivisible,
      isDivisible,
      context: null,
    };
  }

  override getHandlerName(): string {
    return SupervisionChainBackedDivisibilityStrategyResolutionHandler.HANDLER_NAME;
  }

  override getHandlerPriority(): number {
    return SupervisionChainBackedDivisibilityStrategyResolutionHandler.HANDLER_PRIORITY;
  }
}
