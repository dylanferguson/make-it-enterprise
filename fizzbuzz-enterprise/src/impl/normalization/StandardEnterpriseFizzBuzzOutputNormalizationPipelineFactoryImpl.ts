import { AbstractBaseEnterpriseFizzBuzzOutputNormalizationPipelineFactory } from "../../abstracts/AbstractBaseEnterpriseFizzBuzzOutputNormalizationPipelineFactory.js";
import type { IEnterpriseFizzBuzzOutputNormalizationPipeline } from "../../contracts/IEnterpriseFizzBuzzOutputNormalizationPipeline.js";
import type { IEnterpriseFizzBuzzOutputNormalizationStage } from "../../contracts/IEnterpriseFizzBuzzOutputNormalizationStage.js";
import { StandardEnterpriseFizzBuzzOutputNormalizationPipelineImpl } from "./StandardEnterpriseFizzBuzzOutputNormalizationPipelineImpl.js";
import {
  StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfiguratorImpl,
  EnterpriseFizzBuzzNormalizationStageConfigurationProfile,
} from "./StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfiguratorImpl.js";

export class StandardEnterpriseFizzBuzzOutputNormalizationPipelineFactoryImpl
  extends AbstractBaseEnterpriseFizzBuzzOutputNormalizationPipelineFactory
{
  private static readonly FACTORY_NAME = "StandardEnterpriseFizzBuzzOutputNormalizationPipelineFactory";
  private static readonly FACTORY_VERSION = "1.0.0-FACTORY";

  private readonly profile: EnterpriseFizzBuzzNormalizationStageConfigurationProfile;
  private readonly configurator: StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfiguratorImpl;

  constructor(
    profile: EnterpriseFizzBuzzNormalizationStageConfigurationProfile = "STANDARD",
    configurator?: StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfiguratorImpl,
  ) {
    super();
    this.profile = profile;
    this.configurator = configurator ?? new StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfiguratorImpl(profile);
  }

  override createPipeline(): IEnterpriseFizzBuzzOutputNormalizationPipeline {
    const stages: IEnterpriseFizzBuzzOutputNormalizationStage[] = this.configurator.configureStages();
    const pipeline = new StandardEnterpriseFizzBuzzOutputNormalizationPipelineImpl(stages);
    this.validatePipeline(pipeline);
    return pipeline;
  }

  override getFactoryName(): string {
    return StandardEnterpriseFizzBuzzOutputNormalizationPipelineFactoryImpl.FACTORY_NAME;
  }

  override getFactoryVersion(): string {
    return StandardEnterpriseFizzBuzzOutputNormalizationPipelineFactoryImpl.FACTORY_VERSION;
  }

  getConfigurationProfile(): EnterpriseFizzBuzzNormalizationStageConfigurationProfile {
    return this.profile;
  }

  getConfigurator(): StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfiguratorImpl {
    return this.configurator;
  }
}
