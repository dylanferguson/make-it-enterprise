import { AbstractBaseRemainderComputationStrategy } from "../../abstracts/AbstractBaseRemainderComputationStrategy.js";

export class NativeModuloRemainderComputationStrategyImpl
  extends AbstractBaseRemainderComputationStrategy
{
  private static readonly STRATEGY_NAME = "NativeModuloRemainderComputationStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-NATIVE-MODULO-STRATEGY";

  constructor() {
    super(
      NativeModuloRemainderComputationStrategyImpl.STRATEGY_NAME,
      NativeModuloRemainderComputationStrategyImpl.STRATEGY_VERSION,
    );
  }

  override computeRemainder(dividend: number, divisor: number): number {
    this.validateOperands(dividend, divisor);
    return dividend % divisor;
  }
}
