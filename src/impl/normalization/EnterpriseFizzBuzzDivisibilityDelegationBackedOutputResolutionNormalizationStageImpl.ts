import { AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage.js";
import type { IEnterpriseFizzBuzzNormalizationContext } from "../../contracts/IEnterpriseFizzBuzzNormalizationContext.js";
import type { IEnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider } from "../../contracts/IEnterpriseDivisibilityDelegationOutputStringResolutionProviderFactory.js";
import { EnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryBeanFactory } from "../../outputresolution/impl/factories/EnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryBeanFactory.js";

export class EnterpriseFizzBuzzDivisibilityDelegationBackedOutputResolutionNormalizationStageImpl
  extends AbstractBaseEnterpriseFizzBuzzOutputNormalizationStage
{
  private static readonly STAGE_NAME = "EnterpriseFizzBuzzDivisibilityDelegationBackedOutputResolutionNormalizationStage";
  private static readonly STAGE_PRIORITY = 50;
  private static readonly STAGE_VERSION = "1.0.0-DELEGATION-RESOLUTION-ENRICHMENT";

  private static reResolutionCount = 0;

  private provider: IEnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider | null = null;
  private providerResolutionAttempted = false;

  override normalize(context: IEnterpriseFizzBuzzNormalizationContext): IEnterpriseFizzBuzzNormalizationContext {
    const computationValue = context.getComputationValue();
    const provider = this.resolveProvider();
    if (provider !== null) {
      const delegatedResult = provider.resolveOutputString(computationValue);
      EnterpriseFizzBuzzDivisibilityDelegationBackedOutputResolutionNormalizationStageImpl.reResolutionCount++;
      const originalResult = context.getNormalizedResult();
      if (delegatedResult !== originalResult) {
        context.setNormalizedResult(delegatedResult);
      }
    }
    return this.proceedToNext(context);
  }

  override getStageName(): string {
    return EnterpriseFizzBuzzDivisibilityDelegationBackedOutputResolutionNormalizationStageImpl.STAGE_NAME;
  }

  override getStagePriority(): number {
    return EnterpriseFizzBuzzDivisibilityDelegationBackedOutputResolutionNormalizationStageImpl.STAGE_PRIORITY;
  }

  private resolveProvider(): IEnterpriseDivisibilityFacadeBackedOutputStringResolutionProvider | null {
    if (!this.providerResolutionAttempted) {
      this.providerResolutionAttempted = true;
      try {
        this.provider = EnterpriseDivisibilityDelegationOutputStringResolutionProviderFactoryBeanFactory.createProvider();
      } catch {
        this.provider = null;
      }
    }
    return this.provider;
  }

  static getReResolutionCount(): number {
    return EnterpriseFizzBuzzDivisibilityDelegationBackedOutputResolutionNormalizationStageImpl.reResolutionCount;
  }

  static resetMetrics(): void {
    EnterpriseFizzBuzzDivisibilityDelegationBackedOutputResolutionNormalizationStageImpl.reResolutionCount = 0;
  }
}
