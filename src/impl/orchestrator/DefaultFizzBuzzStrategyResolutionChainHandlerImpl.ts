import { AbstractBaseFizzBuzzStrategyResolutionChainHandler } from "../../abstracts/AbstractBaseFizzBuzzStrategyResolutionChainHandler.js";
import { FizzBuzzOutputStringResolutionStrategyFactoryBeanFactory } from "../../outputresolution/impl/factories/FizzBuzzOutputStringResolutionStrategyFactoryBeanFactory.js";
import { FizzBuzzOutputStringResolutionStrategyImpl } from "../../outputresolution/impl/strategies/FizzBuzzOutputStringResolutionStrategyImpl.js";
import { FizzOutputStringResolutionStrategyImpl } from "../../outputresolution/impl/strategies/FizzOutputStringResolutionStrategyImpl.js";
import { BuzzOutputStringResolutionStrategyImpl } from "../../outputresolution/impl/strategies/BuzzOutputStringResolutionStrategyImpl.js";
import type { IFizzBuzzOutputStringResolutionStrategyProvider } from "../../outputresolution/contracts/index.js";

export class DefaultFizzBuzzStrategyResolutionChainHandlerImpl extends AbstractBaseFizzBuzzStrategyResolutionChainHandler {
  private static readonly HANDLER_NAME = "DefaultFizzBuzzStrategyResolutionChainHandler";
  private static readonly HANDLER_PRIORITY = 0;
  private static readonly DEFAULT_STRATEGY_TYPE = "DEFAULT_MODULO_ARITHMETIC_STRATEGY";

  private outputStringProvider: IFizzBuzzOutputStringResolutionStrategyProvider | null = null;
  private readonly fizzBuzzStrategy = new FizzBuzzOutputStringResolutionStrategyImpl();
  private readonly fizzStrategy = new FizzOutputStringResolutionStrategyImpl();
  private readonly buzzStrategy = new BuzzOutputStringResolutionStrategyImpl();

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
    if (this.fizzBuzzStrategy.canResolve(value)) return 15;
    if (this.fizzStrategy.canResolve(value)) return 3;
    if (this.buzzStrategy.canResolve(value)) return 5;
    return null;
  }

  private resolveOutputStringProvider(): IFizzBuzzOutputStringResolutionStrategyProvider {
    if (this.outputStringProvider === null) {
      this.outputStringProvider =
        FizzBuzzOutputStringResolutionStrategyFactoryBeanFactory.createProvider();
    }
    return this.outputStringProvider;
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
