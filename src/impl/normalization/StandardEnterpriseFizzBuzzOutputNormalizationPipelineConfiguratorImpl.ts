import { AbstractBaseEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator.js";
import type { IEnterpriseFizzBuzzOutputNormalizationStage } from "../../contracts/IEnterpriseFizzBuzzOutputNormalizationStage.js";
import { EnterpriseFizzBuzzResultNonEmptyValidationNormalizationStageImpl } from "./EnterpriseFizzBuzzResultNonEmptyValidationNormalizationStageImpl.js";
import { EnterpriseFizzBuzzResultCanonicalizationNormalizationStageImpl } from "./EnterpriseFizzBuzzResultCanonicalizationNormalizationStageImpl.js";
import { EnterpriseFizzBuzzResultFormatVerificationNormalizationStageImpl } from "./EnterpriseFizzBuzzResultFormatVerificationNormalizationStageImpl.js";
import { EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl } from "./EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl.js";
import { EnterpriseFizzBuzzDivisibilityDelegationBackedOutputResolutionNormalizationStageImpl } from "./EnterpriseFizzBuzzDivisibilityDelegationBackedOutputResolutionNormalizationStageImpl.js";

export const EnterpriseFizzBuzzNormalizationStageConfigurationProfile = {
  STANDARD: "STANDARD",
  MINIMAL: "MINIMAL",
  OBSERVABILITY_FOCUSED: "OBSERVABILITY_FOCUSED",
  STRICT: "STRICT",
} as const;

export type EnterpriseFizzBuzzNormalizationStageConfigurationProfile =
  (typeof EnterpriseFizzBuzzNormalizationStageConfigurationProfile)[keyof typeof EnterpriseFizzBuzzNormalizationStageConfigurationProfile];

export class StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfiguratorImpl
  extends AbstractBaseEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator
{
  private static readonly CONFIGURATOR_NAME = "StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator";
  private static readonly CONFIGURATOR_VERSION = "1.0.0-CONFIGURATOR";

  private readonly profile: EnterpriseFizzBuzzNormalizationStageConfigurationProfile;

  constructor(profile: EnterpriseFizzBuzzNormalizationStageConfigurationProfile = "STANDARD") {
    super();
    this.profile = profile;
  }

  override configureStages(): IEnterpriseFizzBuzzOutputNormalizationStage[] {
    const stages: IEnterpriseFizzBuzzOutputNormalizationStage[] = [];

    switch (this.profile) {
      case "MINIMAL":
        stages.push(new EnterpriseFizzBuzzResultNonEmptyValidationNormalizationStageImpl());
        break;
      case "OBSERVABILITY_FOCUSED":
        stages.push(new EnterpriseFizzBuzzResultNonEmptyValidationNormalizationStageImpl());
        stages.push(new EnterpriseFizzBuzzDivisibilityDelegationBackedOutputResolutionNormalizationStageImpl());
        stages.push(new EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl());
        break;
      case "STRICT":
        stages.push(new EnterpriseFizzBuzzResultNonEmptyValidationNormalizationStageImpl());
        stages.push(new EnterpriseFizzBuzzResultCanonicalizationNormalizationStageImpl());
        stages.push(new EnterpriseFizzBuzzDivisibilityDelegationBackedOutputResolutionNormalizationStageImpl());
        stages.push(new EnterpriseFizzBuzzResultFormatVerificationNormalizationStageImpl());
        stages.push(new EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl());
        break;
      case "STANDARD":
      default:
        stages.push(new EnterpriseFizzBuzzResultNonEmptyValidationNormalizationStageImpl());
        stages.push(new EnterpriseFizzBuzzResultCanonicalizationNormalizationStageImpl());
        stages.push(new EnterpriseFizzBuzzDivisibilityDelegationBackedOutputResolutionNormalizationStageImpl());
        stages.push(new EnterpriseFizzBuzzResultSloMetricsCollectionNormalizationStageImpl());
        break;
    }

    this.sortByPriority(stages);
    this.linkStages(stages);
    return stages;
  }

  override getConfiguratorName(): string {
    return StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfiguratorImpl.CONFIGURATOR_NAME;
  }

  override getConfiguratorVersion(): string {
    return StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfiguratorImpl.CONFIGURATOR_VERSION;
  }

  override isStageEnabled(stageName: string): boolean {
    return this.configureStages().some((s) => s.getStageName() === stageName);
  }

  getConfigurationProfile(): EnterpriseFizzBuzzNormalizationStageConfigurationProfile {
    return this.profile;
  }
}
