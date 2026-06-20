import { AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage.js";
import type { IEnterpriseFizzBuzzNormalizationContext } from "../../contracts/IEnterpriseFizzBuzzNormalizationContext.js";
import { FizzBuzzOutputFormatterImpl } from "../formatters/FizzBuzzOutputFormatterImpl.js";

export class EnterpriseFizzBuzzResultFormatVerificationNormalizationStageImpl
  extends AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage
{
  private static readonly STAGE_NAME = "EnterpriseFizzBuzzResultFormatVerificationNormalizationStage";
  private static readonly STAGE_PRIORITY = 50;

  private readonly allowedResults: ReadonlySet<string>;

  constructor() {
    super();
    const formatter = new FizzBuzzOutputFormatterImpl();
    this.allowedResults = new Set([
      formatter.formatFizz(),
      formatter.formatBuzz(),
      formatter.formatFizzBuzz(),
    ]);
  }

  override normalize(context: IEnterpriseFizzBuzzNormalizationContext): IEnterpriseFizzBuzzNormalizationContext {
    const normalized = context.getNormalizedResult();
    if (!this.allowedResults.has(normalized)) {
      const numericValue = Number(normalized);
      if (!Number.isFinite(numericValue)) {
        const fallback = String(context.getComputationValue());
        context.setNormalizedResult(fallback);
      }
    }
    return this.proceedToNext(context);
  }

  override getStageName(): string {
    return EnterpriseFizzBuzzResultFormatVerificationNormalizationStageImpl.STAGE_NAME;
  }

  override getStagePriority(): number {
    return EnterpriseFizzBuzzResultFormatVerificationNormalizationStageImpl.STAGE_PRIORITY;
  }
}
