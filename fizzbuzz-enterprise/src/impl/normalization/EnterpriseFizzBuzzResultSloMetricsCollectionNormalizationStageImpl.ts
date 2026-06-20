import { AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage.js";
import type { IEnterpriseFizzBuzzNormalizationContext } from "../../contracts/IEnterpriseFizzBuzzNormalizationContext.js";

export class EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl
  extends AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage
{
  private static readonly STAGE_NAME = "EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStage";
  private static readonly STAGE_PRIORITY = 25;

  private static totalResultsNormalized = 0;
  private static totalFizzResults = 0;
  private static totalBuzzResults = 0;
  private static totalFizzBuzzResults = 0;
  private static totalNumericResults = 0;

  override normalize(context: IEnterpriseFizzBuzzNormalizationContext): IEnterpriseFizzBuzzNormalizationContext {
    EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalResultsNormalized++;
    const result = context.getNormalizedResult();
    switch (result) {
      case "Fizz":
        EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalFizzResults++;
        break;
      case "Buzz":
        EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalBuzzResults++;
        break;
      case "FizzBuzz":
        EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalFizzBuzzResults++;
        break;
      default:
        EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalNumericResults++;
        break;
    }
    return this.proceedToNext(context);
  }

  override getStageName(): string {
    return EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.STAGE_NAME;
  }

  override getStagePriority(): number {
    return EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.STAGE_PRIORITY;
  }

  static getTotalResultsNormalized(): number {
    return EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalResultsNormalized;
  }

  static getMetricsReport(): Record<string, number> {
    return {
      totalNormalized: EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalResultsNormalized,
      fizzCount: EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalFizzResults,
      buzzCount: EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalBuzzResults,
      fizzBuzzCount: EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalFizzBuzzResults,
      numericCount: EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalNumericResults,
    };
  }

  static resetMetrics(): void {
    EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalResultsNormalized = 0;
    EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalFizzResults = 0;
    EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalBuzzResults = 0;
    EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalFizzBuzzResults = 0;
    EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.totalNumericResults = 0;
  }
}
