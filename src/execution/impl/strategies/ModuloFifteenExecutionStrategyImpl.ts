import { AbstractBaseDivisibilityDrivenModularArithmeticExecutionStrategy } from "./AbstractBaseDivisibilityDrivenModularArithmeticExecutionStrategy.js";

export class ModuloFifteenExecutionStrategyImpl
  extends AbstractBaseDivisibilityDrivenModularArithmeticExecutionStrategy
{
  private static readonly STRATEGY_NAME = "ModuloFifteenExecutionStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-MODULO-FIFTEEN-EXECUTION";
  private static readonly SUPPORTED_DIVISOR = 15;
  private static readonly OUTPUT_MESSAGE = "FizzBuzz";

  constructor() {
    super(
      ModuloFifteenExecutionStrategyImpl.STRATEGY_NAME,
      ModuloFifteenExecutionStrategyImpl.STRATEGY_VERSION,
      ModuloFifteenExecutionStrategyImpl.SUPPORTED_DIVISOR,
      ModuloFifteenExecutionStrategyImpl.OUTPUT_MESSAGE,
    );
  }
}
