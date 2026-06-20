import type { IEnterpriseComputationStrategySelectionHandler } from "./IEnterpriseComputationStrategySelectionHandler.js";
import type { IEnterpriseComputationStrategySelectionContext } from "./IEnterpriseComputationStrategySelectionContext.js";

export interface IEnterpriseComputationStrategySelectionChain {
  addHandler(handler: IEnterpriseComputationStrategySelectionHandler): void;
  removeHandler(handlerName: string): boolean;
  resolveStrategy(context: IEnterpriseComputationStrategySelectionContext): IEnterpriseComputationStrategySelectionHandler | null;
  getHandlers(): readonly IEnterpriseComputationStrategySelectionHandler[];
  getChainName(): string;
  getChainVersion(): string;
}
