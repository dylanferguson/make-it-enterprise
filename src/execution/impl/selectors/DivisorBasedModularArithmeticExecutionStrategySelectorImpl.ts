import { AbstractBaseModularArithmeticExecutionStrategySelector } from "../../abstracts/AbstractBaseModularArithmeticExecutionStrategySelector.js";
import type { IModularArithmeticExecutionStrategy } from "../../contracts/index.js";
import {
  ModuloThreeExecutionStrategyImpl,
} from "../strategies/ModuloThreeExecutionStrategyImpl.js";
import {
  ModuloFiveExecutionStrategyImpl,
} from "../strategies/ModuloFiveExecutionStrategyImpl.js";
import {
  ModuloFifteenExecutionStrategyImpl,
} from "../strategies/ModuloFifteenExecutionStrategyImpl.js";

export class DivisorBasedModularArithmeticExecutionStrategySelectorImpl
  extends AbstractBaseModularArithmeticExecutionStrategySelector
{
  private static readonly SELECTOR_NAME = "DivisorBasedModularArithmeticExecutionStrategySelector";
  private static readonly SELECTOR_VERSION = "1.0.0-DIVISOR-BASED-STRATEGY-SELECTOR";

  private readonly moduloThreeStrategy: IModularArithmeticExecutionStrategy;
  private readonly moduloFiveStrategy: IModularArithmeticExecutionStrategy;
  private readonly moduloFifteenStrategy: IModularArithmeticExecutionStrategy;

  constructor() {
    super();
    this.moduloThreeStrategy = new ModuloThreeExecutionStrategyImpl();
    this.moduloFiveStrategy = new ModuloFiveExecutionStrategyImpl();
    this.moduloFifteenStrategy = new ModuloFifteenExecutionStrategyImpl();
  }

  override selectStrategy(value: number): IModularArithmeticExecutionStrategy {
    if (value % 15 === 0) {
      return this.moduloFifteenStrategy;
    }
    if (value % 5 === 0) {
      return this.moduloFiveStrategy;
    }
    if (value % 3 === 0) {
      return this.moduloThreeStrategy;
    }
    return this.moduloFifteenStrategy;
  }

  override getSelectorName(): string {
    return DivisorBasedModularArithmeticExecutionStrategySelectorImpl.SELECTOR_NAME;
  }

  override getSelectorVersion(): string {
    return DivisorBasedModularArithmeticExecutionStrategySelectorImpl.SELECTOR_VERSION;
  }

  override getRegisteredStrategies(): readonly string[] {
    return [
      this.moduloThreeStrategy.getStrategyName(),
      this.moduloFiveStrategy.getStrategyName(),
      this.moduloFifteenStrategy.getStrategyName(),
    ];
  }
}
