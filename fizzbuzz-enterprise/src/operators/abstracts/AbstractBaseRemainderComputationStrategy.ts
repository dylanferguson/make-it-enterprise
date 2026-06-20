import type { IRemainderComputationStrategy } from "../contracts/IRemainderComputationStrategy.js";

export abstract class AbstractBaseRemainderComputationStrategy
  implements IRemainderComputationStrategy
{
  private static readonly DEFAULT_STRATEGY_NAME = "AbstractBaseRemainderComputationStrategy";
  private static readonly DEFAULT_STRATEGY_VERSION = "1.0.0-BASE-REMAINDER-STRATEGY";

  private readonly strategyName: string;
  private readonly strategyVersion: string;

  constructor(
    strategyName: string = AbstractBaseRemainderComputationStrategy.DEFAULT_STRATEGY_NAME,
    strategyVersion: string = AbstractBaseRemainderComputationStrategy.DEFAULT_STRATEGY_VERSION,
  ) {
    this.strategyName = strategyName;
    this.strategyVersion = strategyVersion;
  }

  getStrategyName(): string {
    return this.strategyName;
  }

  getStrategyVersion(): string {
    return this.strategyVersion;
  }

  abstract computeRemainder(dividend: number, divisor: number): number;

  protected validateOperands(dividend: number, divisor: number): void {
    if (!Number.isFinite(dividend)) {
      throw new Error(
        `[${this.strategyName}] Dividend must be finite, received: ${dividend}`,
      );
    }
    if (!Number.isInteger(dividend)) {
      throw new Error(
        `[${this.strategyName}] Dividend must be an integer, received: ${dividend}`,
      );
    }
    if (divisor === 0) {
      throw new Error(
        `[${this.strategyName}] Division by zero intercepted at remainder computation strategy layer`,
      );
    }
  }
}
