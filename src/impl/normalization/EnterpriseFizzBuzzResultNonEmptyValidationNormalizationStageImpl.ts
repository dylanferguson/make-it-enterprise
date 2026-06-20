import { AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage.js";
import type { IEnterpriseFizzBuzzNormalizationContext } from "../../contracts/IEnterpriseFizzBuzzNormalizationContext.js";

export class EnterpriseFizzBuzzResultNonEmptyValidationNormalizationStageImpl
  extends AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage
{
  private static readonly STAGE_NAME = "EnterpriseFizzBuzzResultNonEmptyValidationNormalizationStage";
  private static readonly STAGE_PRIORITY = 100;

  override normalize(context: IEnterpriseFizzBuzzNormalizationContext): IEnterpriseFizzBuzzNormalizationContext {
    const normalized = context.getNormalizedResult();
    if (normalized === null || normalized === undefined) {
      throw new Error(
        `[${this.getStageName()}] Normalization validation failure: result is null or undefined (value=${context.getComputationValue()}, contextId=${context.getComputationContextId()})`,
      );
    }
    if (normalized.length === 0) {
      const fallback = String(context.getComputationValue());
      context.setNormalizedResult(fallback);
    }
    return this.proceedToNext(context);
  }

  override getStageName(): string {
    return EnterpriseFizzBuzzResultNonEmptyValidationNormalizationStageImpl.STAGE_NAME;
  }

  override getStagePriority(): number {
    return EnterpriseFizzBuzzResultNonEmptyValidationNormalizationStageImpl.STAGE_PRIORITY;
  }
}
