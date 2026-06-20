import type { IModularArithmeticExecutionStrategySelector, IModularArithmeticExecutionStrategy } from "../contracts/index.js";

export abstract class AbstractBaseModularArithmeticExecutionStrategySelector
  implements IModularArithmeticExecutionStrategySelector
{
  private static readonly SELECTOR_FRAMEWORK_VERSION = "1.0.0-STRATEGY-SELECTOR-FRAMEWORK";

  abstract selectStrategy(value: number): IModularArithmeticExecutionStrategy;
  abstract getSelectorName(): string;
  abstract getSelectorVersion(): string;
  abstract getRegisteredStrategies(): readonly string[];

  protected getSelectorFrameworkVersion(): string {
    return AbstractBaseModularArithmeticExecutionStrategySelector.SELECTOR_FRAMEWORK_VERSION;
  }
}
