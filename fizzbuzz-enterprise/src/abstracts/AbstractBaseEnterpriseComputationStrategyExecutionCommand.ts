import type { IFizzBuzzComputationCommand } from "../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../contracts/IFizzBuzzComputationResponse.js";
import type { IEnterpriseComputationStrategyExecutionCommand } from "../contracts/IEnterpriseComputationStrategyExecutionCommand.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../contracts/IEnterpriseComputationStrategySelectionContext.js";

export abstract class AbstractBaseEnterpriseComputationStrategyExecutionCommand
  implements IEnterpriseComputationStrategyExecutionCommand
{
  protected static readonly EXECUTION_COMMAND_FRAMEWORK_VERSION = "1.0.0-EXECUTION-COMMAND-FRAMEWORK";

  abstract getExecutionCommandName(): string;
  abstract getExecutionCommandVersion(): string;

  abstract executeWithStrategy(
    baseCommand: IFizzBuzzComputationCommand,
    context: IEnterpriseComputationStrategySelectionContext,
  ): IFizzBuzzComputationResponse;

  protected validateExecutionParameters(
    baseCommand: IFizzBuzzComputationCommand,
    context: IEnterpriseComputationStrategySelectionContext,
  ): void {
    if (baseCommand === null || baseCommand === undefined) {
      throw new Error(`[${this.getExecutionCommandName()}] Base command must not be null`);
    }
    if (context === null || context === undefined) {
      throw new Error(`[${this.getExecutionCommandName()}] Selection context must not be null`);
    }
  }

  protected getExecutionCommandFrameworkVersion(): string {
    return AbstractBaseEnterpriseComputationStrategyExecutionCommand.EXECUTION_COMMAND_FRAMEWORK_VERSION;
  }
}
