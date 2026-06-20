import type { IPipelineManagerResolutionConfigurationProfile } from "../contracts/IPipelineManagerResolutionConfigurationProfile.js";
import type { IPipelineManagerResolutionStrategy } from "../contracts/IPipelineManagerResolutionStrategy.js";
import type { IFizzBuzzPipelineManager } from "../../pipeline/contracts/IFizzBuzzPipelineManager.js";
import { DirectPipelineManagerResolutionStrategyImpl } from "../impl/DirectPipelineManagerResolutionStrategyImpl.js";

export class PipelineManagerResolutionStrategyFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME = "PipelineManagerResolutionStrategyFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PMRS-FBF";

  private static cachedDirectStrategy: IPipelineManagerResolutionStrategy | null = null;

  static createDirectResolutionStrategy(
    configurationProfile: IPipelineManagerResolutionConfigurationProfile,
    managerResolver: () => IFizzBuzzPipelineManager,
  ): IPipelineManagerResolutionStrategy {
    if (
      PipelineManagerResolutionStrategyFactoryBeanFactory.cachedDirectStrategy !== null
    ) {
      return PipelineManagerResolutionStrategyFactoryBeanFactory.cachedDirectStrategy;
    }
    const strategy = new DirectPipelineManagerResolutionStrategyImpl(
      configurationProfile,
      managerResolver,
    );
    PipelineManagerResolutionStrategyFactoryBeanFactory.cachedDirectStrategy = strategy;
    return strategy;
  }

  static resetStrategyCache(): void {
    PipelineManagerResolutionStrategyFactoryBeanFactory.cachedDirectStrategy = null;
  }

  static getFactoryBeanName(): string {
    return PipelineManagerResolutionStrategyFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return PipelineManagerResolutionStrategyFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
