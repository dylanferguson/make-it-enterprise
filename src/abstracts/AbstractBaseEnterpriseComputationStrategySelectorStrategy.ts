import type { IComputationStrategySelectorStrategy } from "../contracts/IComputationStrategySelectorStrategy.js";
import type { IEnterpriseComputationStrategySelectionHandler } from "../contracts/IEnterpriseComputationStrategySelectionHandler.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../contracts/IEnterpriseComputationStrategySelectionContext.js";

export abstract class AbstractBaseEnterpriseComputationStrategySelectorStrategy
  implements IComputationStrategySelectorStrategy
{
  protected static readonly FRAMEWORK_VERSION = "1.0.0-SELECTOR-STRATEGY-FRAMEWORK";

  abstract selectSelector(context: IEnterpriseComputationStrategySelectionContext): IEnterpriseComputationStrategySelectionHandler;
  abstract getSelectorStrategyName(): string;
  abstract getSelectorStrategyVersion(): string;

  supportsSelectionContext(context: IEnterpriseComputationStrategySelectionContext): boolean {
    const value = context.getRequestedValue();
    return Number.isFinite(value) && value >= 0;
  }

  protected validateSelectionContext(context: IEnterpriseComputationStrategySelectionContext): void {
    const value = context.getRequestedValue();
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(
        `[${this.getSelectorStrategyName()} v${AbstractBaseEnterpriseComputationStrategySelectorStrategy.FRAMEWORK_VERSION}] ` +
        `Invalid selection context: computation value is ${String(value)}`,
      );
    }
  }
}
