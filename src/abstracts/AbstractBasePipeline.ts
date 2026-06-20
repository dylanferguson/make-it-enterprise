import type { IPipeline } from "../contracts/IPipeline.js";
import type { IPipelineStage } from "../contracts/IPipelineStage.js";
import type { IPipelineContext } from "../contracts/IPipelineContext.js";

export abstract class AbstractBasePipeline<TInput, TOutput> implements IPipeline<TInput, TOutput> {
  protected readonly stages: IPipelineStage<TInput, TOutput>[] = [];
  protected readonly pipelineContext: IPipelineContext;
  private pipelineExecutionCount: number = 0;
  private pipelineTotalExecutionMs: number = 0;
  private pipelineErrorCount: number = 0;

  constructor(pipelineContext: IPipelineContext) {
    this.pipelineContext = pipelineContext;
  }

  abstract getPipelineName(): string;
  abstract getPipelineVersion(): string;

  execute(input: TInput): TOutput {
    const pipelineStartTime = performance.now();
    this.pipelineExecutionCount++;
    this.prePipelineExecution(input);
    try {
      if (this.stages.length === 0) {
        throw new Error(
          `[${this.getPipelineName()}] No stages registered in pipeline. Cannot execute.`,
        );
      }
      const sortedStages = [...this.stages].sort(
        (a, b) => b.getStagePriority() - a.getStagePriority(),
      );
      this.pipelineContext.clear();
      this.pipelineContext.setAttribute("pipeline.input", input);
      this.pipelineContext.setAttribute("pipeline.startTimestamp", pipelineStartTime);
      const result = this.executeStageChain(input, sortedStages, 0);
      const totalDurationMs = performance.now() - pipelineStartTime;
      this.pipelineTotalExecutionMs += totalDurationMs;
      this.postPipelineExecution(input, result, totalDurationMs);
      return result;
    } catch (error) {
      this.pipelineErrorCount++;
      throw error;
    }
  }

  addStage(stage: IPipelineStage<TInput, TOutput>): void {
    this.stages.push(stage);
  }

  removeStage(stageName: string): boolean {
    const index = this.stages.findIndex((s) => s.getStageName() === stageName);
    if (index !== -1) {
      this.stages.splice(index, 1);
      return true;
    }
    return false;
  }

  getStageCount(): number {
    return this.stages.length;
  }

  getPipelineContext(): IPipelineContext {
    return this.pipelineContext;
  }

  getPipelineExecutionCount(): number {
    return this.pipelineExecutionCount;
  }

  getPipelineTotalExecutionMs(): number {
    return this.pipelineTotalExecutionMs;
  }

  getPipelineErrorCount(): number {
    return this.pipelineErrorCount;
  }

  protected prePipelineExecution(_input: TInput): void {
  }

  protected postPipelineExecution(_input: TInput, _output: TOutput, _totalDurationMs: number): void {
  }

  private executeStageChain(
    input: TInput,
    sortedStages: IPipelineStage<TInput, TOutput>[],
    index: number,
  ): TOutput {
    if (index >= sortedStages.length) {
      throw new Error(
        `[${this.getPipelineName()}] All stages exhausted without producing output for: ${input}`,
      );
    }
    const currentStage = sortedStages[index]!;
    const stageStartTime = performance.now();
    this.preStageExecution(currentStage, input);
    try {
      const nextStage = index + 1 < sortedStages.length ? sortedStages[index + 1]! : null;
      const result = currentStage.execute(input, this.pipelineContext, nextStage);
      const stageDurationMs = performance.now() - stageStartTime;
      this.postStageExecution(currentStage, input, result, stageDurationMs);
      this.pipelineContext.recordStageExecution(currentStage.getStageName(), stageDurationMs);
      return result;
    } catch (error) {
      const stageDurationMs = performance.now() - stageStartTime;
      this.pipelineContext.recordStageExecution(currentStage.getStageName(), stageDurationMs);
      throw error;
    }
  }

  protected preStageExecution(_stage: IPipelineStage<TInput, TOutput>, _input: TInput): void {
  }

  protected postStageExecution(
    _stage: IPipelineStage<TInput, TOutput>,
    _input: TInput,
    _output: TOutput,
    _stageDurationMs: number,
  ): void {
  }
}
