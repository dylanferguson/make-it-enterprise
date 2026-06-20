import type { IPipelineManagerResolutionStrategy } from "../contracts/IPipelineManagerResolutionStrategy.js";
import type { IFizzBuzzPipelineManager } from "../../pipeline/contracts/IFizzBuzzPipelineManager.js";
import type { IPipelineManagerResolutionConfigurationProfile } from "../contracts/IPipelineManagerResolutionConfigurationProfile.js";

export abstract class AbstractBasePipelineManagerResolutionStrategy
  implements IPipelineManagerResolutionStrategy
{
  protected abstract readonly strategyName: string;
  protected abstract readonly strategyVersion: string;
  protected abstract readonly configurationProfile: IPipelineManagerResolutionConfigurationProfile;

  abstract resolvePipelineManager(): IFizzBuzzPipelineManager;
  abstract canResolve(): boolean;

  getStrategyName(): string {
    return this.strategyName;
  }

  getStrategyVersion(): string {
    return this.strategyVersion;
  }

  getConfigurationProfile(): IPipelineManagerResolutionConfigurationProfile {
    return this.configurationProfile;
  }
}
