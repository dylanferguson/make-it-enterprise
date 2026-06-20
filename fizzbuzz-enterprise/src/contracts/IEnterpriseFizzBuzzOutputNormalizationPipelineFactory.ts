import type { IEnterpriseFizzBuzzOutputNormalizationPipeline } from "./IEnterpriseFizzBuzzOutputNormalizationPipeline.js";

export interface IEnterpriseFizzBuzzOutputNormalizationPipelineFactory {
  createPipeline(): IEnterpriseFizzBuzzOutputNormalizationPipeline;
  getFactoryName(): string;
  getFactoryVersion(): string;
}
