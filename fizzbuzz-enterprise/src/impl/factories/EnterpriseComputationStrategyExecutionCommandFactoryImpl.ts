import { AbstractBaseEnterpriseComputationStrategyExecutionCommandFactory } from "../../abstracts/AbstractBaseEnterpriseComputationStrategyExecutionCommandFactory.js";
import type { IEnterpriseComputationStrategyExecutionCommand } from "../../contracts/IEnterpriseComputationStrategyExecutionCommand.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../../contracts/IEnterpriseComputationStrategySelectionContext.js";
import { EnterpriseComputationStrategyExecutionCommandImpl } from "../commands/EnterpriseComputationStrategyExecutionCommandImpl.js";

export class EnterpriseComputationStrategyExecutionCommandFactoryImpl
  extends AbstractBaseEnterpriseComputationStrategyExecutionCommandFactory
{
  private static readonly FACTORY_NAME = "EnterpriseComputationStrategyExecutionCommandFactory";
  private static readonly FACTORY_VERSION = "1.0.0-EXECUTION-COMMAND-FACTORY";

  private static readonly singleton = new EnterpriseComputationStrategyExecutionCommandImpl();

  getFactoryName(): string {
    return EnterpriseComputationStrategyExecutionCommandFactoryImpl.FACTORY_NAME;
  }

  getFactoryVersion(): string {
    return EnterpriseComputationStrategyExecutionCommandFactoryImpl.FACTORY_VERSION;
  }

  createExecutionCommand(
    context: IEnterpriseComputationStrategySelectionContext,
  ): IEnterpriseComputationStrategyExecutionCommand {
    return EnterpriseComputationStrategyExecutionCommandFactoryImpl.singleton;
  }
}
