import type { IEnterpriseComputationStrategySelectionHandler } from "./IEnterpriseComputationStrategySelectionHandler.js";
import type { IEnterpriseComputationStrategySelectionContext } from "./IEnterpriseComputationStrategySelectionContext.js";

export interface IComputationStrategySelectorStrategy {
  selectSelector(context: IEnterpriseComputationStrategySelectionContext): IEnterpriseComputationStrategySelectionHandler;
  getSelectorStrategyName(): string;
  getSelectorStrategyVersion(): string;
  supportsSelectionContext(context: IEnterpriseComputationStrategySelectionContext): boolean;
}
