import { AbstractBaseDivisibilityDrivenModularArithmeticExecutionStrategy } from "./AbstractBaseDivisibilityDrivenModularArithmeticExecutionStrategy.js";

export class ModuloFiveExecutionStrategyImpl
  extends AbstractBaseDivisibilityDrivenModularArithmeticExecutionStrategy
{
  private static readonly STRATEGY_NAME = "ModuloFiveExecutionStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-MODULO-FIVE-EXECUTION";
  private static readonly SUPPORTED_DIVISOR = 5;
  private static readonly OUTPUT_MESSAGE = "Buzz";

  constructor() {
    super(
      ModuloFiveExecutionStrategyImpl.STRATEGY_NAME,
      ModuloFiveExecutionStrategyImpl.STRATEGY_VERSION,
      ModuloFiveExecutionStrategyImpl.SUPPORTED_DIVISOR,
      ModuloFiveExecutionStrategyImpl.OUTPUT_MESSAGE,
    );
  }
}
