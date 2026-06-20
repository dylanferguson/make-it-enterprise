import type { IEnterpriseFizzBuzzOutputNormalizationPipeline } from "../../contracts/IEnterpriseFizzBuzzOutputNormalizationPipeline.js";
import type { IEnterpriseFizzBuzzOutputNormalizationPipelineFactory } from "../../contracts/IEnterpriseFizzBuzzOutputNormalizationPipelineFactory.js";
import type { IEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator } from "../../contracts/IEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator.js";
import type { IEnterpriseFizzBuzzOutputNormalizationPipelineManagerFacade } from "../../contracts/IEnterpriseFizzBuzzOutputNormalizationPipelineManagerFacade.js";
import {
  StandardEnterpriseFizzBuzzOutputNormalizationPipelineFactoryImpl,
} from "./StandardEnterpriseFizzBuzzOutputNormalizationPipelineFactoryImpl.js";
import {
  StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfiguratorImpl,
  EnterpriseFizzBuzzNormalizationStageConfigurationProfile,
} from "./StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfiguratorImpl.js";

export class EnterpriseFizzBuzzOutputNormalizationPipelineManagerFacadeImpl
  implements IEnterpriseFizzBuzzOutputNormalizationPipelineManagerFacade
{
  private static readonly FACADE_NAME = "EnterpriseFizzBuzzOutputNormalizationPipelineManagerFacade";
  private static readonly FACADE_VERSION = "1.0.0-MANAGER-FACADE";

  private readonly factory: IEnterpriseFizzBuzzOutputNormalizationPipelineFactory;
  private readonly configurator: IEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator;
  private pipeline: IEnterpriseFizzBuzzOutputNormalizationPipeline | null = null;

  constructor(
    factory?: IEnterpriseFizzBuzzOutputNormalizationPipelineFactory,
    configurator?: IEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator,
  ) {
    this.configurator = configurator ?? new StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfiguratorImpl();
    this.factory = factory ?? new StandardEnterpriseFizzBuzzOutputNormalizationPipelineFactoryImpl(
      EnterpriseFizzBuzzNormalizationStageConfigurationProfile.STANDARD,
      this.configurator as StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfiguratorImpl,
    );
  }

  resolvePipeline(): IEnterpriseFizzBuzzOutputNormalizationPipeline {
    if (this.pipeline === null) {
      this.pipeline = this.factory.createPipeline();
    }
    return this.pipeline;
  }

  resolveFactory(): IEnterpriseFizzBuzzOutputNormalizationPipelineFactory {
    return this.factory;
  }

  resolveConfigurator(): IEnterpriseFizzBuzzOutputNormalizationPipelineConfigurator {
    return this.configurator;
  }

  getManagerFacadeName(): string {
    return EnterpriseFizzBuzzOutputNormalizationPipelineManagerFacadeImpl.FACADE_NAME;
  }

  getManagerFacadeVersion(): string {
    return EnterpriseFizzBuzzOutputNormalizationPipelineManagerFacadeImpl.FACADE_VERSION;
  }

  resetPipeline(): void {
    this.pipeline = null;
  }
}
