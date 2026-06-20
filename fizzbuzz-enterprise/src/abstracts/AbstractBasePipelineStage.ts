import type { IPipelineStage } from "../contracts/IPipelineStage.js";
import type { IPipelineContext } from "../contracts/IPipelineContext.js";

export abstract class AbstractBasePipelineStage<TInput, TOutput> implements IPipelineStage<TInput, TOutput> {
  private static readonly STAGE_LIFECYCLE_STATE_INITIALIZED = "INITIALIZED";
  private static readonly STAGE_LIFECYCLE_STATE_ACTIVE = "ACTIVE";
  private static readonly STAGE_LIFECYCLE_STATE_DISPOSED = "DISPOSED";

  private lifecycleState: string = AbstractBasePipelineStage.STAGE_LIFECYCLE_STATE_INITIALIZED;
  private invocationCount: number = 0;
  private totalExecutionMs: number = 0;

  abstract execute(input: TInput, context: IPipelineContext, nextStage: IPipelineStage<TInput, TOutput> | null): TOutput;
  abstract getStageName(): string;
  abstract getStageVersion(): string;
  abstract getStagePriority(): number;
  abstract canHandle(input: TInput): boolean;

  protected handleNext(input: TInput, context: IPipelineContext, nextStage: IPipelineStage<TInput, TOutput> | null): TOutput {
    if (nextStage === null) {
      throw new Error(
        `[${this.getStageName()}] End of pipeline reached without producing output for input: ${input}`,
      );
    }
    return nextStage.execute(input, context, null);
  }

  protected preStageExecution(input: TInput): void {
    this.lifecycleState = AbstractBasePipelineStage.STAGE_LIFECYCLE_STATE_ACTIVE;
    this.invocationCount++;
  }

  protected postStageExecution(input: TInput, output: TOutput, startTime: number): void {
    const elapsedMs = performance.now() - startTime;
    this.totalExecutionMs += elapsedMs;
  }

  getInvocationCount(): number {
    return this.invocationCount;
  }

  getTotalExecutionMs(): number {
    return this.totalExecutionMs;
  }

  getAverageExecutionMs(): number {
    return this.invocationCount > 0 ? this.totalExecutionMs / this.invocationCount : 0;
  }

  getLifecycleState(): string {
    return this.lifecycleState;
  }

  dispose(): void {
    this.lifecycleState = AbstractBasePipelineStage.STAGE_LIFECYCLE_STATE_DISPOSED;
  }
}
