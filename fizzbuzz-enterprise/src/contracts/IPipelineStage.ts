import type { IPipelineContext } from "./IPipelineContext.js";

export interface IPipelineStage<TInput, TOutput> {
  execute(input: TInput, context: IPipelineContext, nextStage: IPipelineStage<TInput, TOutput> | null): TOutput;
  getStageName(): string;
  getStageVersion(): string;
  getStagePriority(): number;
  canHandle(input: TInput): boolean;
}
