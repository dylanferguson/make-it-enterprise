import { AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage.js";
import type { IEnterpriseFizzBuzzNormalizationContext } from "../../contracts/IEnterpriseFizzBuzzNormalizationContext.js";

export class EnterpriseFizzBuzzResultCanonicalizationNormalizationStageImpl
  extends AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage
{
  private static readonly STAGE_NAME = "EnterpriseFizzBuzzResultCanonicalizationNormalizationStage";
  private static readonly STAGE_PRIORITY = 75;

  override normalize(context: IEnterpriseFizzBuzzNormalizationContext): IEnterpriseFizzBuzzNormalizationContext {
    const normalized = context.getNormalizedResult();
    const canonicalized = normalized.trim();
    context.setNormalizedResult(canonicalized);
    return this.proceedToNext(context);
  }

  override getStageName(): string {
    return EnterpriseFizzBuzzResultCanonicalizationNormalizationStageImpl.STAGE_NAME;
  }

  override getStagePriority(): number {
    return EnterpriseFizzBuzzResultCanonicalizationNormalizationStageImpl.STAGE_PRIORITY;
  }
}
