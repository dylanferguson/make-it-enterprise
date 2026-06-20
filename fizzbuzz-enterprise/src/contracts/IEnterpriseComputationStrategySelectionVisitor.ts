import type { IEnterpriseComputationStrategySelectionContext } from "./IEnterpriseComputationStrategySelectionContext.js";
import type { IEnterpriseComputationStrategySelectionHandler } from "./IEnterpriseComputationStrategySelectionHandler.js";

export interface IEnterpriseComputationStrategySelectionVisitor {
  visitContext(context: IEnterpriseComputationStrategySelectionContext): void;
  visitHandler(handler: IEnterpriseComputationStrategySelectionHandler): void;
  getVisitorName(): string;
  getVisitorVersion(): string;
}
