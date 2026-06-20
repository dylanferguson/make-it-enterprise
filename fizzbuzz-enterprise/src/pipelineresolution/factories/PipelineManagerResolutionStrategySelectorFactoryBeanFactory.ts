import type { IPipelineManagerResolutionStrategySelector } from "../contracts/IPipelineManagerResolutionStrategySelector.js";
import type { IPipelineManagerResolutionStrategy } from "../contracts/IPipelineManagerResolutionStrategy.js";
import { ConfigurationProfileDrivenPipelineManagerResolutionStrategySelectorImpl } from "../impl/ConfigurationProfileDrivenPipelineManagerResolutionStrategySelectorImpl.js";
import type { PipelineManagerResolutionStrategyConfigurationProfileName } from "../impl/ConfigurationProfileDrivenPipelineManagerResolutionStrategySelectorImpl.js";

export class PipelineManagerResolutionStrategySelectorFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "PipelineManagerResolutionStrategySelectorFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PMRSS-FBF";

  private static selectorSingleton: IPipelineManagerResolutionStrategySelector | null = null;
  private static factoryInitialized = false;

  static createSelector(
    activeProfile: PipelineManagerResolutionStrategyConfigurationProfileName = "STANDARD",
    strategies: Map<string, IPipelineManagerResolutionStrategy> = new Map(),
  ): IPipelineManagerResolutionStrategySelector {
    if (PipelineManagerResolutionStrategySelectorFactoryBeanFactory.factoryInitialized) {
      return PipelineManagerResolutionStrategySelectorFactoryBeanFactory.selectorSingleton!;
    }
    const selector = new ConfigurationProfileDrivenPipelineManagerResolutionStrategySelectorImpl(
      activeProfile,
    );
    for (const [name, strategy] of strategies) {
      selector.registerResolutionStrategy(name, strategy);
    }
    PipelineManagerResolutionStrategySelectorFactoryBeanFactory.selectorSingleton = selector;
    PipelineManagerResolutionStrategySelectorFactoryBeanFactory.factoryInitialized = true;
    return selector;
  }

  static getSelector(): IPipelineManagerResolutionStrategySelector | null {
    return PipelineManagerResolutionStrategySelectorFactoryBeanFactory.selectorSingleton;
  }

  static isSelectorInitialized(): boolean {
    return PipelineManagerResolutionStrategySelectorFactoryBeanFactory.factoryInitialized;
  }

  static resetSelector(): void {
    PipelineManagerResolutionStrategySelectorFactoryBeanFactory.selectorSingleton = null;
    PipelineManagerResolutionStrategySelectorFactoryBeanFactory.factoryInitialized = false;
  }

  static getFactoryBeanName(): string {
    return PipelineManagerResolutionStrategySelectorFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return PipelineManagerResolutionStrategySelectorFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
