import type { IEnterpriseFizzBuzzOutputNormalizationPipelineFactory } from "../contracts/IEnterpriseFizzBuzzOutputNormalizationPipelineFactory.js";
import type { IEnterpriseFizzBuzzOutputNormalizationPipeline } from "../contracts/IEnterpriseFizzBuzzOutputNormalizationPipeline.js";

export abstract class AbstractBaseEnterpriseFizzBuzzOutputNormalizationPipelineFactory
  implements IEnterpriseFizzBuzzOutputNormalizationPipelineFactory
{
  abstract createPipeline(): IEnterpriseFizzBuzzOutputNormalizationPipeline;
  abstract getFactoryName(): string;
  abstract getFactoryVersion(): string;

  protected validatePipeline(pipeline: IEnterpriseFizzBuzzOutputNormalizationPipeline): void {
    if (pipeline.getStageCount() === 0) {
      throw new Error(
        `[${this.getFactoryName()}] Pipeline validation failed: zero stages configured. At least one normalization stage is required.`,
      );
    }
  }
}
