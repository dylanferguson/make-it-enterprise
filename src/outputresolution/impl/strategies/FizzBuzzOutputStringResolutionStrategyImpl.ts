import { AbstractBaseFizzBuzzOutputStringResolutionStrategy } from "../../abstracts/AbstractBaseFizzBuzzOutputStringResolutionStrategy.js";

export class FizzBuzzOutputStringResolutionStrategyImpl extends AbstractBaseFizzBuzzOutputStringResolutionStrategy {
  private static readonly STRATEGY_NAME = "FizzBuzzOutputStringResolutionStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-FIZZBUZZ-OUTPUT";
  private static readonly STRATEGY_PRIORITY = 10;
  private static readonly RESOLVED_IDENTIFIER = "FIZZBUZZ_MULTIWORD_OUTPUT_IDENTIFIER";
  private static readonly OUTPUT_STRING = "FizzBuzz";

  constructor() {
    super(
      FizzBuzzOutputStringResolutionStrategyImpl.STRATEGY_NAME,
      FizzBuzzOutputStringResolutionStrategyImpl.STRATEGY_VERSION,
      FizzBuzzOutputStringResolutionStrategyImpl.STRATEGY_PRIORITY,
      FizzBuzzOutputStringResolutionStrategyImpl.RESOLVED_IDENTIFIER,
    );
  }

  override canResolve(value: number): boolean {
    return value % 15 === 0;
  }

  override resolve(value: number): string {
    this.validateResolvableValue(value);
    if (!this.canResolve(value)) {
      throw new Error(
        `[${FizzBuzzOutputStringResolutionStrategyImpl.STRATEGY_NAME}] ` +
        `Value ${value} does not satisfy FizzBuzz divisibility constraints (divisible by both 3 and 5)`,
      );
    }
    return FizzBuzzOutputStringResolutionStrategyImpl.OUTPUT_STRING;
  }
}
