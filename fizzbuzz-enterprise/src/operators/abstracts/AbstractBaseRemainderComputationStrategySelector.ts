import type { IRemainderComputationStrategy } from "../contracts/IRemainderComputationStrategy.js";
import type { IRemainderComputationStrategySelector } from "../contracts/IRemainderComputationStrategySelector.js";

export abstract class AbstractBaseRemainderComputationStrategySelector
  implements IRemainderComputationStrategySelector
{
  private static readonly DEFAULT_SELECTOR_NAME = "AbstractBaseRemainderComputationStrategySelector";
  private static readonly DEFAULT_SELECTOR_VERSION = "1.0.0-BASE-REMAINDER-STRATEGY-SELECTOR";

  private readonly selectorName: string;
  private readonly selectorVersion: string;
  protected readonly strategyRegistry: Map<number, IRemainderComputationStrategy> = new Map();
  protected defaultStrategy: IRemainderComputationStrategy | null = null;

  constructor(
    selectorName: string = AbstractBaseRemainderComputationStrategySelector.DEFAULT_SELECTOR_NAME,
    selectorVersion: string = AbstractBaseRemainderComputationStrategySelector.DEFAULT_SELECTOR_VERSION,
  ) {
    this.selectorName = selectorName;
    this.selectorVersion = selectorVersion;
  }

  getSelectorName(): string {
    return this.selectorName;
  }

  getSelectorVersion(): string {
    return this.selectorVersion;
  }

  abstract selectStrategy(divisor: number): IRemainderComputationStrategy;

  registerStrategy(divisor: number, strategy: IRemainderComputationStrategy): void {
    this.strategyRegistry.set(divisor, strategy);
  }

  getRegisteredDivisorCount(): number {
    return this.strategyRegistry.size;
  }

  setDefaultStrategy(strategy: IRemainderComputationStrategy): void {
    this.defaultStrategy = strategy;
  }

  protected resolveDefaultStrategy(): IRemainderComputationStrategy {
    if (this.defaultStrategy !== null) {
      return this.defaultStrategy;
    }
    throw new Error(
      `[${this.selectorName}] No default remainder computation strategy configured and no strategy registered for requested divisor`,
    );
  }
}
