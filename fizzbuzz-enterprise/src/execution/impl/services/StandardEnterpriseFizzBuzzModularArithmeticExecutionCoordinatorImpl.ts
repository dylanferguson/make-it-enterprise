import { AbstractBaseEnterpriseFizzBuzzModularArithmeticExecutionCoordinator } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzModularArithmeticExecutionCoordinator.js";
import type { IModularArithmeticExecutionStrategySelector } from "../../contracts/index.js";
import type { ICircuitBreakerStateSnapshot } from "../../contracts/index.js";

export class StandardEnterpriseFizzBuzzModularArithmeticExecutionCoordinatorImpl
  extends AbstractBaseEnterpriseFizzBuzzModularArithmeticExecutionCoordinator
{
  private static readonly COORDINATOR_NAME = "StandardEnterpriseFizzBuzzModularArithmeticExecutionCoordinator";
  private static readonly COORDINATOR_VERSION = "1.0.0-STANDARD-EXECUTION-COORDINATOR";

  private readonly strategySelector: IModularArithmeticExecutionStrategySelector;
  private readonly terminalResolutionDelegate: (value: number) => string;

  constructor(
    strategySelector: IModularArithmeticExecutionStrategySelector,
    terminalResolutionDelegate: (value: number) => string,
  ) {
    super();
    this.strategySelector = strategySelector;
    this.terminalResolutionDelegate = terminalResolutionDelegate;
  }

  override coordinateSingleValueExecution(value: number): string {
    this.validateExecutionValue(value);
    const strategy = this.strategySelector.selectStrategy(value);
    return strategy.executeValueResolution(value, this.terminalResolutionDelegate);
  }

  override getCoordinatorName(): string {
    return StandardEnterpriseFizzBuzzModularArithmeticExecutionCoordinatorImpl.COORDINATOR_NAME;
  }

  override getCoordinatorVersion(): string {
    return StandardEnterpriseFizzBuzzModularArithmeticExecutionCoordinatorImpl.COORDINATOR_VERSION;
  }

  override getRegisteredExecutionStrategies(): readonly string[] {
    return this.strategySelector.getRegisteredStrategies();
  }

  override getCircuitBreakerStateSnapshot(): ICircuitBreakerStateSnapshot {
    return {
      stateName: "NOT_TRACKED",
      isClosed: true,
      isOpen: false,
      isHalfOpen: false,
      failureCount: 0,
      successCount: 0,
      lastFailureTimestampMs: 0,
      lastSuccessTimestampMs: 0,
      failureThreshold: 0,
      successThreshold: 0,
    };
  }
}
