import type { IEnterpriseComputationStrategyExecutionInterceptor } from "../contracts/IEnterpriseComputationStrategyExecutionInterceptor.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../contracts/IEnterpriseComputationStrategySelectionContext.js";
import type { IEnterpriseComputationStrategyExecutionCommand } from "../contracts/IEnterpriseComputationStrategyExecutionCommand.js";

export abstract class AbstractBaseEnterpriseComputationStrategyExecutionInterceptor
  implements IEnterpriseComputationStrategyExecutionInterceptor
{
  protected static readonly INTERCEPTOR_FRAMEWORK_VERSION = "1.0.0-INTERCEPTOR-FRAMEWORK";

  abstract getInterceptorName(): string;
  abstract getInterceptorOrder(): number;

  abstract preExecution(context: IEnterpriseComputationStrategySelectionContext): void;
  abstract postExecution(
    context: IEnterpriseComputationStrategySelectionContext,
    executionCommand: IEnterpriseComputationStrategyExecutionCommand,
  ): void;
}
