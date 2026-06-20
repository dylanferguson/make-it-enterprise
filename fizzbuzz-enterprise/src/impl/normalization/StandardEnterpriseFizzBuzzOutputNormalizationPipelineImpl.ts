import { AbstractBaseEnterpriseFizzBuzzOutputNormalizationPipeline } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzOutputNormalizationPipeline.js";
import type { IEnterpriseFizzBuzzOutputNormalizationStage } from "../../contracts/IEnterpriseFizzBuzzOutputNormalizationStage.js";
import type { IEnterpriseFizzBuzzNormalizationContext } from "../../contracts/IEnterpriseFizzBuzzNormalizationContext.js";
import { StandardEnterpriseFizzBuzzNormalizationContextImpl } from "./StandardEnterpriseFizzBuzzNormalizationContextImpl.js";

export class StandardEnterpriseFizzBuzzOutputNormalizationPipelineImpl
  extends AbstractBaseEnterpriseFizzBuzzOutputNormalizationPipeline
{
  private static readonly PIPELINE_NAME = "StandardEnterpriseFizzBuzzOutputNormalizationPipeline";
  private static readonly PIPELINE_VERSION = "1.0.0-NORMALIZATION-PIPELINE";

  constructor(stages: IEnterpriseFizzBuzzOutputNormalizationStage[]) {
    super(stages, StandardEnterpriseFizzBuzzOutputNormalizationPipelineImpl.PIPELINE_NAME, StandardEnterpriseFizzBuzzOutputNormalizationPipelineImpl.PIPELINE_VERSION);
  }

  override execute(result: string, computationValue: number, contextId: string): string {
    const context = this.createContext(result, computationValue, contextId);
    const stages = this.getStages();
    if (stages.length === 0) {
      return result;
    }
    const headStage = stages[0]!;
    const finalContext = headStage.normalize(context);
    return finalContext.getNormalizedResult();
  }

  protected override doCreateContext(
    result: string,
    computationValue: number,
    contextId: string,
  ): IEnterpriseFizzBuzzNormalizationContext {
    return new StandardEnterpriseFizzBuzzNormalizationContextImpl(result, computationValue, contextId);
  }
}
