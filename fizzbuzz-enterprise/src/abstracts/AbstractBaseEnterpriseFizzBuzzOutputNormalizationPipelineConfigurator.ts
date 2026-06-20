import type { IEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator } from "../contracts/IEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator.js";
import type { IEnterpriseFizzBuzzOutputNormalizationStage } from "../contracts/IEnterpriseFizzBuzzOutputNormalizationStage.js";

export abstract class AbstractBaseEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator
  implements IEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator
{
  abstract configureStages(): IEnterpriseFizzBuzzOutputNormalizationStage[];
  abstract getConfiguratorName(): string;
  abstract getConfiguratorVersion(): string;
  abstract isStageEnabled(stageName: string): boolean;

  protected linkStages(stages: IEnterpriseFizzBuzzOutputNormalizationStage[]): void {
    for (let i = 0; i < stages.length - 1; i++) {
      stages[i]!.setNext(stages[i + 1]!);
    }
  }

  protected sortByPriority(stages: IEnterpriseFizzBuzzOutputNormalizationStage[]): void {
    stages.sort((a, b) => b.getStagePriority() - a.getStagePriority());
  }
}
