import type { IPipelineManagerResolutionConfigurationProfile } from "../contracts/IPipelineManagerResolutionConfigurationProfile.js";
import { StandardPipelineManagerResolutionConfigurationProfileImpl } from "../impl/StandardPipelineManagerResolutionConfigurationProfileImpl.js";
import type { ResolutionConfigurationProfileType } from "../impl/StandardPipelineManagerResolutionConfigurationProfileImpl.js";

export class PipelineManagerResolutionConfigurationProfileFactoryBeanFactory {
  private static readonly FACTORY_BEAN_NAME =
    "PipelineManagerResolutionConfigurationProfileFactoryBeanFactory";
  private static readonly FACTORY_BEAN_VERSION = "1.0.0-PMRCP-FBF";

  private static cachedProfiles: Map<string, IPipelineManagerResolutionConfigurationProfile> = new Map();

  static createConfigurationProfile(
    profileType: ResolutionConfigurationProfileType = "STANDARD",
  ): IPipelineManagerResolutionConfigurationProfile {
    const cacheKey = `PROFILE_${profileType}`;
    const cached = PipelineManagerResolutionConfigurationProfileFactoryBeanFactory.cachedProfiles.get(cacheKey);
    if (cached !== undefined) {
      return cached;
    }
    const profile = new StandardPipelineManagerResolutionConfigurationProfileImpl(profileType);
    PipelineManagerResolutionConfigurationProfileFactoryBeanFactory.cachedProfiles.set(cacheKey, profile);
    return profile;
  }

  static getProfile(
    profileType: ResolutionConfigurationProfileType = "STANDARD",
  ): IPipelineManagerResolutionConfigurationProfile | undefined {
    const cacheKey = `PROFILE_${profileType}`;
    return PipelineManagerResolutionConfigurationProfileFactoryBeanFactory.cachedProfiles.get(cacheKey);
  }

  static resetProfileCache(): void {
    PipelineManagerResolutionConfigurationProfileFactoryBeanFactory.cachedProfiles.clear();
  }

  static getFactoryBeanName(): string {
    return PipelineManagerResolutionConfigurationProfileFactoryBeanFactory.FACTORY_BEAN_NAME;
  }

  static getFactoryBeanVersion(): string {
    return PipelineManagerResolutionConfigurationProfileFactoryBeanFactory.FACTORY_BEAN_VERSION;
  }
}
