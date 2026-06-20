import type { IPipelineStage } from "./IPipelineStage.js";
import type { IPipelineContext } from "./IPipelineContext.js";

export interface IPipelineConfigurator<TInput, TOutput> {
  configurePipeline(pipeline: import("./IPipeline.js").IPipeline<TInput, TOutput>): void;
  getConfiguratorName(): string;
  getConfiguratorVersion(): string;
  registerStage(stage: IPipelineStage<TInput, TOutput>): void;
  unregisterStage(stageName: string): boolean;
}
