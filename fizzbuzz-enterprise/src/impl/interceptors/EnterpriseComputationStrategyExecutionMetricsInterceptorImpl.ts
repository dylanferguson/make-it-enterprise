import { AbstractBaseEnterpriseComputationStrategyExecutionInterceptor } from "../../abstracts/AbstractBaseEnterpriseComputationStrategyExecutionInterceptor.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../../contracts/IEnterpriseComputationStrategySelectionContext.js";
import type { IEnterpriseComputationStrategyExecutionCommand } from "../../contracts/IEnterpriseComputationStrategyExecutionCommand.js";

export class EnterpriseComputationStrategyExecutionMetricsInterceptorImpl
  extends AbstractBaseEnterpriseComputationStrategyExecutionInterceptor
{
  private static readonly INTERCEPTOR_NAME = "EnterpriseComputationStrategyExecutionMetricsInterceptor";
  private static readonly INTERCEPTOR_ORDER = 100;

  private totalInvocations: number = 0;
  private totalDurationMs: number = 0;

  getInterceptorName(): string {
    return EnterpriseComputationStrategyExecutionMetricsInterceptorImpl.INTERCEPTOR_NAME;
  }

  getInterceptorOrder(): number {
    return EnterpriseComputationStrategyExecutionMetricsInterceptorImpl.INTERCEPTOR_ORDER;
  }

  preExecution(context: IEnterpriseComputationStrategySelectionContext): void {
    this.totalInvocations++;
    context.setContextMetadata("metrics:invocationCount", this.totalInvocations);
    context.setContextMetadata("metrics:startTime", performance.now());
  }

  postExecution(
    context: IEnterpriseComputationStrategySelectionContext,
    executionCommand: IEnterpriseComputationStrategyExecutionCommand,
  ): void {
    const startTime = context.getContextMetadata().get("metrics:startTime") as number | undefined;
    if (startTime !== undefined) {
      const duration = performance.now() - startTime;
      this.totalDurationMs += duration;
      context.setContextMetadata("metrics:executionDurationMs", duration);
      context.setContextMetadata("metrics:totalDurationMs", this.totalDurationMs);
    }
  }

  getTotalInvocations(): number {
    return this.totalInvocations;
  }

  getTotalDurationMs(): number {
    return this.totalDurationMs;
  }
}
