import type { IEnterpriseComputationStrategyExecutionCommandFactory } from "../contracts/IEnterpriseComputationStrategyExecutionCommandFactory.js";
import type { IEnterpriseComputationStrategyExecutionCommand } from "../contracts/IEnterpriseComputationStrategyExecutionCommand.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../contracts/IEnterpriseComputationStrategySelectionContext.js";

export abstract class AbstractBaseEnterpriseComputationStrategyExecutionCommandFactory
  implements IEnterpriseComputationStrategyExecutionCommandFactory
{
  protected static readonly FACTORY_FRAMEWORK_VERSION = "1.0.0-EXECUTION-COMMAND-FACTORY-FRAMEWORK";

  abstract getFactoryName(): string;
  abstract getFactoryVersion(): string;

  abstract createExecutionCommand(
    context: IEnterpriseComputationStrategySelectionContext,
  ): IEnterpriseComputationStrategyExecutionCommand;

  protected getFactoryFrameworkVersion(): string {
    return AbstractBaseEnterpriseComputationStrategyExecutionCommandFactory.FACTORY_FRAMEWORK_VERSION;
  }
}
