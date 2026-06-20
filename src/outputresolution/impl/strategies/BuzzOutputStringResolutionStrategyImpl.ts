import { AbstractBaseFizzBuzzOutputStringResolutionStrategy } from "../../abstracts/AbstractBaseFizzBuzzOutputStringResolutionStrategy.js";

export class BuzzOutputStringResolutionStrategyImpl extends AbstractBaseFizzBuzzOutputStringResolutionStrategy {
  private static readonly STRATEGY_NAME = "BuzzOutputStringResolutionStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-BUZZ-OUTPUT";
  private static readonly STRATEGY_PRIORITY = 30;
  private static readonly RESOLVED_IDENTIFIER = "BUZZ_OUTPUT_IDENTIFIER";
  private static readonly OUTPUT_STRING = "Buzz";

  constructor() {
    super(
      BuzzOutputStringResolutionStrategyImpl.STRATEGY_NAME,
      BuzzOutputStringResolutionStrategyImpl.STRATEGY_VERSION,
      BuzzOutputStringResolutionStrategyImpl.STRATEGY_PRIORITY,
      BuzzOutputStringResolutionStrategyImpl.RESOLVED_IDENTIFIER,
    );
  }

  override canResolve(value: number): boolean {
    return value % 5 === 0 && value % 3 !== 0;
  }

  override resolve(value: number): string {
    this.validateResolvableValue(value);
    if (!this.canResolve(value)) {
      throw new Error(
        `[${BuzzOutputStringResolutionStrategyImpl.STRATEGY_NAME}] ` +
        `Value ${value} does not satisfy Buzz divisibility constraints (divisible by 5 but not 3)`,
      );
    }
    return BuzzOutputStringResolutionStrategyImpl.OUTPUT_STRING;
  }
}
