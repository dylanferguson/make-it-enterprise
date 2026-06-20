import type { IPipelineManagerResolutionStrategy } from "../contracts/IPipelineManagerResolutionStrategy.js";
import type { IPipelineManagerResolutionStrategySelector } from "../contracts/IPipelineManagerResolutionStrategySelector.js";
import type { IPipelineManagerResolutionConfigurationProfile } from "../contracts/IPipelineManagerResolutionConfigurationProfile.js";
import type { IFizzBuzzPipelineManager } from "../../pipeline/contracts/IFizzBuzzPipelineManager.js";
import { PipelineManagerResolutionStrategyFactoryBeanFactory } from "./PipelineManagerResolutionStrategyFactoryBeanFactory.js";
import { PipelineManagerResolutionStrategySelectorFactoryBeanFactory } from "./PipelineManagerResolutionStrategySelectorFactoryBeanFactory.js";
import { PipelineManagerResolutionConfigurationProfileFactoryBeanFactory } from "./PipelineManagerResolutionConfigurationProfileFactoryBeanFactory.js";
import type { PipelineManagerResolutionStrategyConfigurationProfileName } from "../impl/ConfigurationProfileDrivenPipelineManagerResolutionStrategySelectorImpl.js";
import type { ResolutionConfigurationProfileType } from "../impl/StandardPipelineManagerResolutionConfigurationProfileImpl.js";

export class PipelineManagerResolutionStrategyInfrastructureProviderFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "PipelineManagerResolutionStrategyInfrastructureProviderFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PMRSIP-FBF";

  private static infrastructureInitialized = false;

  static initializeResolutionStrategyInfrastructure(
    activeProfile: PipelineManagerResolutionStrategyConfigurationProfileName = "STANDARD",
    profileType: ResolutionConfigurationProfileType = "STANDARD",
    managerResolver: () => IFizzBuzzPipelineManager,
  ): {
    selector: IPipelineManagerResolutionStrategySelector;
    configurationProfile: IPipelineManagerResolutionConfigurationProfile;
  } {
    if (PipelineManagerResolutionStrategyInfrastructureProviderFactoryBeanFactory.infrastructureInitialized) {
      return {
        selector: PipelineManagerResolutionStrategySelectorFactoryBeanFactory.getSelector()!,
        configurationProfile: PipelineManagerResolutionConfigurationProfileFactoryBeanFactory.getProfile(profileType)!,
      };
    }

    const configurationProfile =
      PipelineManagerResolutionConfigurationProfileFactoryBeanFactory.createConfigurationProfile(profileType);

    const directStrategy =
      PipelineManagerResolutionStrategyFactoryBeanFactory.createDirectResolutionStrategy(
        configurationProfile,
        managerResolver,
      );

    const strategies = new Map<string, IPipelineManagerResolutionStrategy>();
    strategies.set("DIRECT", directStrategy);

    const selector = PipelineManagerResolutionStrategySelectorFactoryBeanFactory.createSelector(
      activeProfile,
      strategies,
    );

    PipelineManagerResolutionStrategyInfrastructureProviderFactoryBeanFactory.infrastructureInitialized = true;

    return { selector, configurationProfile };
  }

  static isInfrastructureInitialized(): boolean {
    return PipelineManagerResolutionStrategyInfrastructureProviderFactoryBeanFactory.infrastructureInitialized;
  }

  static resetInfrastructure(): void {
    PipelineManagerResolutionStrategySelectorFactoryBeanFactory.resetSelector();
    PipelineManagerResolutionStrategyFactoryBeanFactory.resetStrategyCache();
    PipelineManagerResolutionConfigurationProfileFactoryBeanFactory.resetProfileCache();
    PipelineManagerResolutionStrategyInfrastructureProviderFactoryBeanFactory.infrastructureInitialized = false;
  }

  static getFactoryBeanName(): string {
    return PipelineManagerResolutionStrategyInfrastructureProviderFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return PipelineManagerResolutionStrategyInfrastructureProviderFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
