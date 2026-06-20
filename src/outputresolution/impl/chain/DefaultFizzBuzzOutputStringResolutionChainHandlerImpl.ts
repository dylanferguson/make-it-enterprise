import { AbstractBaseFizzBuzzOutputStringResolutionChainHandler } from "../../abstracts/AbstractBaseFizzBuzzOutputStringResolutionChainHandler.js";
import type { IFizzBuzzOutputStringResolutionResult, IFizzBuzzOutputStringResolutionStrategy } from "../../contracts/index.js";

export class DefaultFizzBuzzOutputStringResolutionChainHandlerImpl extends AbstractBaseFizzBuzzOutputStringResolutionChainHandler {
  private static readonly CHAIN_NAME = "DefaultFizzBuzzOutputStringResolutionChain";
  private static readonly CHAIN_VERSION = "1.0.0-OUTPUT-STRING-CHAIN";

  constructor() {
    super(
      DefaultFizzBuzzOutputStringResolutionChainHandlerImpl.CHAIN_NAME,
      DefaultFizzBuzzOutputStringResolutionChainHandlerImpl.CHAIN_VERSION,
    );
  }

  override handleResolution(value: number): IFizzBuzzOutputStringResolutionResult {
    const sortedStrategies = this.getStrategiesSortedByPriority();

    for (const strategy of sortedStrategies) {
      if (strategy.canResolve(value)) {
        const resolvedValue = strategy.resolve(value);
        return this.buildResolutionResult(
          resolvedValue,
          strategy.getName(),
          strategy.getVersion(),
          strategy.getResolvedIdentifier(),
        );
      }
    }

    if (this.fallbackStrategy !== null) {
      const resolvedValue = this.fallbackStrategy.resolve(value);
      return this.buildResolutionResult(
        resolvedValue,
        this.fallbackStrategy.getName(),
        this.fallbackStrategy.getVersion(),
        this.fallbackStrategy.getResolvedIdentifier(),
      );
    }

    throw new Error(
      `[${DefaultFizzBuzzOutputStringResolutionChainHandlerImpl.CHAIN_NAME}] ` +
      `No strategy could resolve value ${value} and no fallback strategy is configured`,
    );
  }
}
