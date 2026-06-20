import type { IEnterpriseFizzBuzzOutputNormalizationPipeline } from "../../contracts/IEnterpriseFizzBuzzOutputNormalizationPipeline.js";
import type { IEnterpriseFizzBuzzOutputNormalizationPipelineFactory } from "../../contracts/IEnterpriseFizzBuzzOutputNormalizationPipelineFactory.js";
import type { IEnterpriseFizzBuzzOutputNormalizationPipelineManagerFacade } from "../../contracts/IEnterpriseFizzBuzzOutputNormalizationPipelineManagerFacade.js";
import {
  EnterpriseFizzBuzzOutputNormalizationPipelineManagerFacadeImpl,
} from "../normalization/EnterpriseFizzBuzzOutputNormalizationPipelineManagerFacadeImpl.js";
import {
  EnterpriseFizzBuzzNormalizationStageConfigurationProfile,
} from "../normalization/StandardEnterpriseFizzBuzzOutputNormalizationPipelineConfiguratorImpl.js";

export class EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean {
  private static readonly FACTORY_BEAN_NAME = "EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-FACTORY-BEAN";

  private static managerFacade: IEnterpriseFizzBuzzOutputNormalizationPipelineManagerFacade | null = null;
  private static pipelineFactory: IEnterpriseFizzBuzzOutputNormalizationPipelineFactory | null = null;
  private static pipeline: IEnterpriseFizzBuzzOutputNormalizationPipeline | null = null;
  private static currentProfile: EnterpriseFizzBuzzNormalizationStageConfigurationProfile = "STANDARD";

  static createPipelineFactory(
    profile: EnterpriseFizzBuzzNormalizationStageConfigurationProfile = "STANDARD",
  ): IEnterpriseFizzBuzzOutputNormalizationPipelineFactory {
    if (EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.pipelineFactory === null) {
      const facade = EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.createManagerFacade(profile);
      EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.pipelineFactory = facade.resolveFactory();
    }
    return EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.pipelineFactory;
  }

  static createPipeline(
    profile: EnterpriseFizzBuzzNormalizationStageConfigurationProfile = "STANDARD",
  ): IEnterpriseFizzBuzzOutputNormalizationPipeline {
    if (
      EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.pipeline === null ||
      EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.currentProfile !== profile
    ) {
      EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.currentProfile = profile;
      const factory = EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.createPipelineFactory(profile);
      EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.pipeline = factory.createPipeline();
    }
    return EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.pipeline;
  }

  static createManagerFacade(
    profile: EnterpriseFizzBuzzNormalizationStageConfigurationProfile = "STANDARD",
  ): IEnterpriseFizzBuzzOutputNormalizationPipelineManagerFacade {
    if (EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.managerFacade === null) {
      EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.managerFacade =
        new EnterpriseFizzBuzzOutputNormalizationPipelineManagerFacadeImpl();
    }
    return EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.managerFacade;
  }

  static getPipelineFactory(): IEnterpriseFizzBuzzOutputNormalizationPipelineFactory | null {
    return EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.pipelineFactory;
  }

  static getPipeline(): IEnterpriseFizzBuzzOutputNormalizationPipeline | null {
    return EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.pipeline;
  }

  static getManagerFacade(): IEnterpriseFizzBuzzOutputNormalizationPipelineManagerFacade | null {
    return EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.managerFacade;
  }

  static reset(): void {
    EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.managerFacade = null;
    EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.pipelineFactory = null;
    EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.pipeline = null;
    EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.currentProfile = "STANDARD";
  }

  static getFactoryBeanName(): string {
    return EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return EnterpriseFizzBuzzOutputNormalizationPipelineFactoryFactoryBean.FACTORY_BEAN_VERSION;
  }
}
