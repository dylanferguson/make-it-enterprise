import type { IPipelineStage } from "./IPipelineStage.js";
import type { IPipelineContext } from "./IPipelineContext.js";

export interface IPipeline<TInput, TOutput> {
  execute(input: TInput): TOutput;
  getPipelineName(): string;
  getPipelineVersion(): string;
  addStage(stage: IPipelineStage<TInput, TOutput>): void;
  removeStage(stageName: string): boolean;
  getStageCount(): number;
  getPipelineContext(): IPipelineContext;
}
