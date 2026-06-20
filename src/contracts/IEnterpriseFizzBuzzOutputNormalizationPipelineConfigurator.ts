import type { IEnterpriseFizzBuzzOutputNormalizationStage } from "./IEnterpriseFizzBuzzOutputNormalizationStage.js";

export interface IEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator {
  configureStages(): IEnterpriseFizzBuzzOutputNormalizationStage[];
  getConfiguratorName(): string;
  getConfiguratorVersion(): string;
  isStageEnabled(stageName: string): boolean;
}
