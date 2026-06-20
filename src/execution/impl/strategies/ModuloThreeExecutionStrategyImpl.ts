import { AbstractBaseDivisibilityDrivenModularArithmeticExecutionStrategy } from "./AbstractBaseDivisibilityDrivenModularArithmeticExecutionStrategy.js";

export class ModuloThreeExecutionStrategyImpl
  extends AbstractBaseDivisibilityDrivenModularArithmeticExecutionStrategy
{
  private static readonly STRATEGY_NAME = "ModuloThreeExecutionStrategy";
  private static readonly STRATEGY_VERSION = "1.0.0-MODULO-THREE-EXECUTION";
  private static readonly SUPPORTED_DIVISOR = 3;
  private static readonly OUTPUT_MESSAGE = "Fizz";

  constructor() {
    super(
      ModuloThreeExecutionStrategyImpl.STRATEGY_NAME,
      ModuloThreeExecutionStrategyImpl.STRATEGY_VERSION,
      ModuloThreeExecutionStrategyImpl.SUPPORTED_DIVISOR,
      ModuloThreeExecutionStrategyImpl.OUTPUT_MESSAGE,
    );
  }
}
