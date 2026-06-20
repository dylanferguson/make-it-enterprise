import type { IEnterpriseFizzBuzzNormalizationContext } from "./IEnterpriseFizzBuzzNormalizationContext.js";

export interface IEnterpriseFizzBuzzOutputNormalizationPipeline {
  execute(result: string, computationValue: number, contextId: string): string;
  getPipelineName(): string;
  getPipelineVersion(): string;
  getStageCount(): number;
}
