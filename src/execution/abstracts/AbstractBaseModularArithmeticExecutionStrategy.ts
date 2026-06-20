import type { IModularArithmeticExecutionStrategy } from "../contracts/index.js";

export abstract class AbstractBaseModularArithmeticExecutionStrategy
  implements IModularArithmeticExecutionStrategy
{
  private static readonly STRATEGY_FRAMEWORK_VERSION = "1.0.0-EXECUTION-STRATEGY-FRAMEWORK";

  abstract getStrategyName(): string;
  abstract getStrategyVersion(): string;
  abstract getSupportedDivisor(): number;
  abstract executeValueResolution(
    value: number,
    innerResolutionDelegate: (v: number) => string,
  ): string;

  protected validateStrategyValue(value: number): void {
    if (!Number.isFinite(value)) {
      throw new Error(
        `[${this.getStrategyName()} v${this.getStrategyVersion()}] Invalid strategy value: ${value}`,
      );
    }
  }

  protected getStrategyFrameworkVersion(): string {
    return AbstractBaseModularArithmeticExecutionStrategy.STRATEGY_FRAMEWORK_VERSION;
  }
}
