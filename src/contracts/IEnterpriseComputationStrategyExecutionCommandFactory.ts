import type { IEnterpriseComputationStrategyExecutionCommand } from "./IEnterpriseComputationStrategyExecutionCommand.js";
import type { IEnterpriseComputationStrategySelectionContext } from "./IEnterpriseComputationStrategySelectionContext.js";

export interface IEnterpriseComputationStrategyExecutionCommandFactory {
  createExecutionCommand(context: IEnterpriseComputationStrategySelectionContext): IEnterpriseComputationStrategyExecutionCommand;
  getFactoryName(): string;
  getFactoryVersion(): string;
}
