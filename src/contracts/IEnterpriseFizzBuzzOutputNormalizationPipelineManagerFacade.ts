import type { IEnterpriseFizzBuzzOutputNormalizationPipeline } from "./IEnterpriseFizzBuzzOutputNormalizationPipeline.js";
import type { IEnterpriseFizzBuzzOutputNormalizationPipelineFactory } from "./IEnterpriseFizzBuzzOutputNormalizationPipelineFactory.js";
import type { IEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator } from "./IEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator.js";

export interface IEnterpriseFizzBuzzOutputNormalizationPipelineManagerFacade {
  resolvePipeline(): IEnterpriseFizzBuzzOutputNormalizationPipeline;
  resolveFactory(): IEnterpriseFizzBuzzOutputNormalizationPipelineFactory;
  resolveConfigurator(): IEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator;
  getManagerFacadeName(): string;
  getManagerFacadeVersion(): string;
}
