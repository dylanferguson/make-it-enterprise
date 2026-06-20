import type { IEnterpriseFizzBuzzOutputNormalizationStage } from "../contracts/IEnterpriseFizzBuzzOutputNormalizationStage.js";
import type { IEnterpriseFizzBuzzNormalizationContext } from "../contracts/IEnterpriseFizzBuzzNormalizationContext.js";

export abstract class AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage
  implements IEnterpriseFizzBuzzOutputNormalizationStage
{
  private nextStage: IEnterpriseFizzBuzzOutputNormalizationStage | null = null;

  abstract normalize(context: IEnterpriseFizzBuzzNormalizationContext): IEnterpriseFizzBuzzNormalizationContext;
  abstract getStageName(): string;
  abstract getStagePriority(): number;

  setNext(stage: IEnterpriseFizzBuzzOutputNormalizationStage): IEnterpriseFizzBuzzOutputNormalizationStage {
    this.nextStage = stage;
    return stage;
  }

  protected proceedToNext(context: IEnterpriseFizzBuzzNormalizationContext): IEnterpriseFizzBuzzNormalizationContext {
    context.recordStageVisit(this.getStageName());
    if (this.nextStage !== null) {
      return this.nextStage.normalize(context);
    }
    return context;
  }
}
