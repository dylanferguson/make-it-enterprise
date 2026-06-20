import type { IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator, ICircuitBreakerStateSnapshot } from "../contracts/index.js";

export abstract class AbstractBaseEnterpriseFizzBuzzModularArithmeticExecutionCoordinator
  implements IEnterpriseFizzBuzzModularArithmeticExecutionCoordinator
{
  private static readonly COORDINATOR_FRAMEWORK_VERSION = "1.0.0-EXECUTION-COORDINATOR-FRAMEWORK";
  private static readonly DEFAULT_COORDINATION_TIMEOUT_MS = 15000;

  abstract coordinateSingleValueExecution(value: number): string;
  abstract getCoordinatorName(): string;
  abstract getCoordinatorVersion(): string;
  abstract getRegisteredExecutionStrategies(): readonly string[];
  abstract getCircuitBreakerStateSnapshot(): import("../contracts/index.js").ICircuitBreakerStateSnapshot;

  protected validateExecutionValue(value: number): void {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(
        `[${this.getCoordinatorName()} v${this.getCoordinatorVersion()}] Invalid execution value: ${value}. Must be a finite non-negative number.`,
      );
    }
  }

  protected getCoordinationTimeoutMs(): number {
    return AbstractBaseEnterpriseFizzBuzzModularArithmeticExecutionCoordinator.DEFAULT_COORDINATION_TIMEOUT_MS;
  }

  protected getCoordinatorFrameworkVersion(): string {
    return AbstractBaseEnterpriseFizzBuzzModularArithmeticExecutionCoordinator.COORDINATOR_FRAMEWORK_VERSION;
  }
}
