import { AbstractBaseFizzBuzzOutputStringResolutionStrategy } from "../../abstracts/AbstractBaseFizzBuzzOutputStringResolutionStrategy.js";

export class NumberOutputStringResolutionStrategyImpl extends AbstractBaseFizzBuzzOutputStringResolutionStrategy {
  private static readonly STRATEGY_NAME = "NumberOutputStringResolutionStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-NUMBER-OUTPUT";
  private static readonly STRATEGY_PRIORITY = 100;
  private static readonly RESOLVED_IDENTIFIER = "NUMBER_PASSTHROUGH_OUTPUT_IDENTIFIER";

  constructor() {
    super(
      NumberOutputStringResolutionStrategyImpl.STRATEGY_NAME,
      NumberOutputStringResolutionStrategyImpl.STRATEGY_VERSION,
      NumberOutputStringResolutionStrategyImpl.STRATEGY_PRIORITY,
      NumberOutputStringResolutionStrategyImpl.RESOLVED_IDENTIFIER,
    );
  }

  override canResolve(_value: number): boolean {
    return true;
  }

  override resolve(value: number): string {
    this.validateResolvableValue(value);
    return String(value);
  }
}
