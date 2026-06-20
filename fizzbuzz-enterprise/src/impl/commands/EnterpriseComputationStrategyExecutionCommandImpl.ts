import { AbstractBaseEnterpriseComputationStrategyExecutionCommand } from "../../abstracts/AbstractBaseEnterpriseComputationStrategyExecutionCommand.js";
import type { IFizzBuzzComputationCommand } from "../../contracts/IFizzBuzzComputationCommand.js";
import type { IFizzBuzzComputationRequest } from "../../contracts/IFizzBuzzComputationRequest.js";
import type { IFizzBuzzComputationResponse } from "../../contracts/IFizzBuzzComputationResponse.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../../contracts/IEnterpriseComputationStrategySelectionContext.js";

export class EnterpriseComputationStrategyExecutionCommandImpl
  extends AbstractBaseEnterpriseComputationStrategyExecutionCommand
{
  private static readonly EXECUTION_COMMAND_NAME = "EnterpriseComputationStrategyExecutionCommand";
  private static readonly EXECUTION_COMMAND_VERSION = "1.0.0-EXECUTION-COMMAND";

  getExecutionCommandName(): string {
    return EnterpriseComputationStrategyExecutionCommandImpl.EXECUTION_COMMAND_NAME;
  }

  getExecutionCommandVersion(): string {
    return EnterpriseComputationStrategyExecutionCommandImpl.EXECUTION_COMMAND_VERSION;
  }

  executeWithStrategy(
    baseCommand: IFizzBuzzComputationCommand,
    context: IEnterpriseComputationStrategySelectionContext,
  ): IFizzBuzzComputationResponse {
    this.validateExecutionParameters(baseCommand, context);
    const request = context.getRequest();
    const response = baseCommand.execute(request);
    response.setComputationDurationMs(context.getSelectionDurationMs());
    return response;
  }
}
