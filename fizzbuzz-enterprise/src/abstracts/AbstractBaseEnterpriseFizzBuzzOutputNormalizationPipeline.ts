import type { IEnterpriseFizzBuzzOutputNormalizationPipeline } from "../contracts/IEnterpriseFizzBuzzOutputNormalizationPipeline.js";
import type { IEnterpriseFizzBuzzOutputNormalizationStage } from "../contracts/IEnterpriseFizzBuzzOutputNormalizationStage.js";
import type { IEnterpriseFizzBuzzNormalizationContext } from "../contracts/IEnterpriseFizzBuzzNormalizationContext.js";

export abstract class AbstractBaseEnterpriseFizzBuzzOutputNormalizationPipeline
  implements IEnterpriseFizzBuzzOutputNormalizationPipeline
{
  private readonly stages: IEnterpriseFizzBuzzOutputNormalizationStage[];
  private readonly pipelineName: string;
  private readonly pipelineVersion: string;

  constructor(
    stages: IEnterpriseFizzBuzzOutputNormalizationStage[],
    pipelineName: string,
    pipelineVersion: string,
  ) {
    this.stages = stages;
    this.pipelineName = pipelineName;
    this.pipelineVersion = pipelineVersion;
  }

  abstract execute(result: string, computationValue: number, contextId: string): string;

  getPipelineName(): string {
    return this.pipelineName;
  }

  getPipelineVersion(): string {
    return this.pipelineVersion;
  }

  getStageCount(): number {
    return this.stages.length;
  }

  protected getStages(): readonly IEnterpriseFizzBuzzOutputNormalizationStage[] {
    return this.stages;
  }

  protected createContext(result: string, computationValue: number, contextId: string): IEnterpriseFizzBuzzNormalizationContext {
    return this.doCreateContext(result, computationValue, contextId);
  }

  protected abstract doCreateContext(
    result: string,
    computationValue: number,
    contextId: string,
  ): IEnterpriseFizzBuzzNormalizationContext;
}
