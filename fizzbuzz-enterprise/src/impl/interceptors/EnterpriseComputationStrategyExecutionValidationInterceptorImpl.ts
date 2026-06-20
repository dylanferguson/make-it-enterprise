import { AbstractBaseEnterpriseComputationStrategyExecutionInterceptor } from "../../abstracts/AbstractBaseEnterpriseComputationStrategyExecutionInterceptor.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../../contracts/IEnterpriseComputationStrategySelectionContext.js";
import type { IEnterpriseComputationStrategyExecutionCommand } from "../../contracts/IEnterpriseComputationStrategyExecutionCommand.js";

export class EnterpriseComputationStrategyExecutionValidationInterceptorImpl
  extends AbstractBaseEnterpriseComputationStrategyExecutionInterceptor
{
  private static readonly INTERCEPTOR_NAME = "EnterpriseComputationStrategyExecutionValidationInterceptor";
  private static readonly INTERCEPTOR_ORDER = 0;

  getInterceptorName(): string {
    return EnterpriseComputationStrategyExecutionValidationInterceptorImpl.INTERCEPTOR_NAME;
  }

  getInterceptorOrder(): number {
    return EnterpriseComputationStrategyExecutionValidationInterceptorImpl.INTERCEPTOR_ORDER;
  }

  preExecution(context: IEnterpriseComputationStrategySelectionContext): void {
    const value = context.getRequestedValue();
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(
        `[${this.getInterceptorName()}] Validation failed: value ${value} must be a finite non-negative number`,
      );
    }
    context.setContextMetadata("validation:passed", true);
  }

  postExecution(
    context: IEnterpriseComputationStrategySelectionContext,
    executionCommand: IEnterpriseComputationStrategyExecutionCommand,
  ): void {
    context.setContextMetadata("validation:postExecuted", true);
  }
}
