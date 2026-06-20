import { AbstractBaseFizzBuzzStrategyResolutionChainHandler } from "../../abstracts/AbstractBaseFizzBuzzStrategyResolutionChainHandler.js";

export class DefaultFizzBuzzStrategyResolutionChainHandlerImpl extends AbstractBaseFizzBuzzStrategyResolutionChainHandler {
  private static readonly HANDLER_NAME = "DefaultFizzBuzzStrategyResolutionChainHandler";
  private static readonly HANDLER_PRIORITY = 0;
  private static readonly DEFAULT_STRATEGY_TYPE = "DEFAULT_MODULO_ARITHMETIC_STRATEGY";

  constructor() {
    super(
      DefaultFizzBuzzStrategyResolutionChainHandlerImpl.HANDLER_NAME,
      DefaultFizzBuzzStrategyResolutionChainHandlerImpl.HANDLER_PRIORITY,
    );
  }

  override handleStrategyResolution(
    value: number,
  ): { resolved: boolean; strategyType: string; divisor: number | null } {
    this.validateOperand(value);

    const resolvedDivisor = this.resolveApplicableDivisor(value);
    return {
      resolved: true,
      strategyType: `${DefaultFizzBuzzStrategyResolutionChainHandlerImpl.DEFAULT_STRATEGY_TYPE}:${resolvedDivisor !== null ? String(resolvedDivisor) : "NONE"}`,
      divisor: resolvedDivisor,
    };
  }

  private resolveApplicableDivisor(value: number): number | null {
    if (value % 15 === 0) return 15;
    if (value % 3 === 0) return 3;
    if (value % 5 === 0) return 5;
    return null;
  }

  private validateOperand(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.handlerName}] Value must be finite, received: ${value}`,
      );
    }
    if (value < 0) {
      throw new Error(
        `[${this.handlerName}] Negative values not supported: ${value}`,
      );
    }
  }
}
