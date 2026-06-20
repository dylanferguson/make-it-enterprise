import { AbstractBaseFizzBuzzOutputStringResolutionStrategy } from "../../abstracts/AbstractBaseFizzBuzzOutputStringResolutionStrategy.js";

export class FizzOutputStringResolutionStrategyImpl extends AbstractBaseFizzBuzzOutputStringResolutionStrategy {
  private static readonly STRATEGY_NAME = "FizzOutputStringResolutionStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-FIZZ-OUTPUT";
  private static readonly STRATEGY_PRIORITY = 20;
  private static readonly RESOLVED_IDENTIFIER = "FIZZ_OUTPUT_IDENTIFIER";
  private static readonly OUTPUT_STRING = "Fizz";

  constructor() {
    super(
      FizzOutputStringResolutionStrategyImpl.STRATEGY_NAME,
      FizzOutputStringResolutionStrategyImpl.STRATEGY_VERSION,
      FizzOutputStringResolutionStrategyImpl.STRATEGY_PRIORITY,
      FizzOutputStringResolutionStrategyImpl.RESOLVED_IDENTIFIER,
    );
  }

  override canResolve(value: number): boolean {
    return value % 3 === 0 && value % 5 !== 0;
  }

  override resolve(value: number): string {
    this.validateResolvableValue(value);
    if (!this.canResolve(value)) {
      throw new Error(
        `[${FizzOutputStringResolutionStrategyImpl.STRATEGY_NAME}] ` +
        `Value ${value} does not satisfy Fizz divisibility constraints (divisible by 3 but not 5)`,
      );
    }
    return FizzOutputStringResolutionStrategyImpl.OUTPUT_STRING;
  }
}
