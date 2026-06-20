import { AbstractBaseRemainderComputationStrategySelector } from "../../abstracts/AbstractBaseRemainderComputationStrategySelector.js";
import type { IRemainderComputationStrategy } from "../../contracts/IRemainderComputationStrategy.js";
import { NativeModuloRemainderComputationStrategyImpl } from "../strategies/NativeModuloRemainderComputationStrategyImpl.js";
import { TruncatedDivisionRemainderComputationStrategyImpl } from "../strategies/TruncatedDivisionRemainderComputationStrategyImpl.js";

export class DivisorBasedRemainderComputationStrategySelectorImpl
  extends AbstractBaseRemainderComputationStrategySelector
{
  private static readonly SELECTOR_NAME = "DivisorBasedRemainderComputationStrategySelector";
  private static readonly SELECTOR_VERSION = "1.0.0-DIVISOR-BASED-STRATEGY-SELECTOR";

  private static readonly TRUNCATION_DIVISOR_THRESHOLD = 100;

  private readonly nativeModuloStrategy: IRemainderComputationStrategy;
  private readonly truncatedDivisionStrategy: IRemainderComputationStrategy;

  constructor() {
    super(
      DivisorBasedRemainderComputationStrategySelectorImpl.SELECTOR_NAME,
      DivisorBasedRemainderComputationStrategySelectorImpl.SELECTOR_VERSION,
    );
    this.nativeModuloStrategy = new NativeModuloRemainderComputationStrategyImpl();
    this.truncatedDivisionStrategy = new TruncatedDivisionRemainderComputationStrategyImpl();
    this.setDefaultStrategy(this.nativeModuloStrategy);
  }

  override selectStrategy(divisor: number): IRemainderComputationStrategy {
    if (this.strategyRegistry.has(divisor)) {
      return this.strategyRegistry.get(divisor)!;
    }
    if (divisor > DivisorBasedRemainderComputationStrategySelectorImpl.TRUNCATION_DIVISOR_THRESHOLD) {
      return this.truncatedDivisionStrategy;
    }
    return this.nativeModuloStrategy;
  }
}
