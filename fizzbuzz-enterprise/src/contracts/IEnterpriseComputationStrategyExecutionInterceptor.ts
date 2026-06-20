import type { IEnterpriseComputationStrategySelectionContext } from "./IEnterpriseComputationStrategySelectionContext.js";
import type { IEnterpriseComputationStrategyExecutionCommand } from "./IEnterpriseComputationStrategyExecutionCommand.js";

export interface IEnterpriseComputationStrategyExecutionInterceptor {
  preExecution(context: IEnterpriseComputationStrategySelectionContext): void;
  postExecution(
    context: IEnterpriseComputationStrategySelectionContext,
    executionCommand: IEnterpriseComputationStrategyExecutionCommand,
  ): void;
  getInterceptorName(): string;
  getInterceptorOrder(): number;
}
