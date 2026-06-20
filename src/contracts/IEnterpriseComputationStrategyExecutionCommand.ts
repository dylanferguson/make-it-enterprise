import type { IFizzBuzzComputationCommand } from "./IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationResponse } from "./IFizzBuzzComputationResponse.js";
import type { IEnterpriseComputationStrategySelectionContext } from "./IEnterpriseComputationStrategySelectionContext.js";

export interface IEnterpriseComputationStrategyExecutionCommand {
  executeWithStrategy(
    baseCommand: IFizzBuzzComputationCommand,
    context: IEnterpriseComputationStrategySelectionContext,
  ): IFizzBuzzComputationResponse;
  getExecutionCommandName(): string;
  getExecutionCommandVersion(): string;
}
