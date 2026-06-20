import type { IPipelineManagerResolutionConfigurationProfile } from "../contracts/IPipelineManagerResolutionConfigurationProfile.js";

export abstract class AbstractBasePipelineManagerResolutionConfigurationProfile
  implements IPipelineManagerResolutionConfigurationProfile
{
  protected abstract readonly profileName: string;
  protected abstract readonly profileVersion: string;
  protected abstract readonly defaultStrategyName: string;
  protected abstract readonly serviceLocatorLookupEnabled: boolean;
  protected abstract readonly resolutionTimeoutMs: number;
  protected abstract readonly maxResolutionAttempts: number;

  getProfileName(): string {
    return this.profileName;
  }

  getProfileVersion(): string {
    return this.profileVersion;
  }

  getDefaultStrategyName(): string {
    return this.defaultStrategyName;
  }

  isServiceLocatorLookupEnabled(): boolean {
    return this.serviceLocatorLookupEnabled;
  }

  getResolutionTimeoutMs(): number {
    return this.resolutionTimeoutMs;
  }

  getMaxResolutionAttempts(): number {
    return this.maxResolutionAttempts;
  }
}
