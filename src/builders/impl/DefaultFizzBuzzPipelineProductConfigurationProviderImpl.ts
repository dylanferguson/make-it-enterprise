import { AbstractBaseFizzBuzzPipelineProductConfigurationProvider } from "../abstracts/AbstractBaseFizzBuzzPipelineProductConfigurationProvider.js";
import type { IFizzBuzzPipelineProductConfigurationProfile } from "../contracts/IFizzBuzzPipelineProductConfigurationProvider.js";

const PROVIDER_NAME = "DefaultFizzBuzzPipelineProductConfigurationProvider";
const PROVIDER_VERSION = "1.0.0-PRODUCT-CONFIG-PROVIDER";

class StandardFizzBuzzPipelineProductConfigurationProfileImpl
  implements IFizzBuzzPipelineProductConfigurationProfile
{
  private readonly profileName: string;
  private readonly profileVersion: string;
  private readonly slaThresholdMs: number;
  private readonly cacheEnabled: boolean;
  private readonly decoratorChainProfile: string;

  constructor(
    profileName: string,
    profileVersion: string,
    slaThresholdMs: number,
    cacheEnabled: boolean,
    decoratorChainProfile: string,
  ) {
    this.profileName = profileName;
    this.profileVersion = profileVersion;
    this.slaThresholdMs = slaThresholdMs;
    this.cacheEnabled = cacheEnabled;
    this.decoratorChainProfile = decoratorChainProfile;
  }

  getProfileName(): string { return this.profileName; }
  getProfileVersion(): string { return this.profileVersion; }
  getSlaThresholdMs(): number { return this.slaThresholdMs; }
  isCacheEnabled(): boolean { return this.cacheEnabled; }
  getDecoratorChainProfile(): string { return this.decoratorChainProfile; }
  getDiagnosticSummary(): Record<string, string> {
    return {
      profileName: this.profileName,
      profileVersion: this.profileVersion,
      slaThresholdMs: String(this.slaThresholdMs),
      cacheEnabled: String(this.cacheEnabled),
      decoratorChainProfile: this.decoratorChainProfile,
    };
  }
}

export class DefaultFizzBuzzPipelineProductConfigurationProviderImpl
  extends AbstractBaseFizzBuzzPipelineProductConfigurationProvider
{
  protected readonly providerName: string = PROVIDER_NAME;
  protected readonly providerVersion: string = PROVIDER_VERSION;

  constructor() {
    super();
    this.registerProfile(
      new StandardFizzBuzzPipelineProductConfigurationProfileImpl(
        "ENTERPRISE_ITERATOR_BASED",
        "2.0.0-ENTERPRISE-ITERATOR-PROFILE",
        50,
        true,
        "FULL_DECORATOR_CHAIN",
      ),
    );
    this.registerProfile(
      new StandardFizzBuzzPipelineProductConfigurationProfileImpl(
        "STANDARD",
        "1.0.0-STANDARD-PROFILE",
        100,
        true,
        "MINIMAL_DECORATOR_CHAIN",
      ),
    );
    this.registerProfile(
      new StandardFizzBuzzPipelineProductConfigurationProfileImpl(
        "STRICT",
        "1.0.0-STRICT-PROFILE",
        30,
        false,
        "FULL_DECORATOR_CHAIN",
      ),
    );
    this.registerProfile(
      new StandardFizzBuzzPipelineProductConfigurationProfileImpl(
        "OBSERVABILITY",
        "1.0.0-OBSERVABILITY-PROFILE",
        200,
        true,
        "OBSERVABILITY_DECORATOR_CHAIN",
      ),
    );
    this.activeProfileName = "ENTERPRISE_ITERATOR_BASED";
  }

  override resolveConfigurationProfile(profileName: string): IFizzBuzzPipelineProductConfigurationProfile {
    const profile = this.registeredProfiles.get(profileName);
    if (profile === undefined) {
      const fallback = this.registeredProfiles.get("STANDARD");
      if (fallback === undefined) {
        throw new Error(
          `[${this.providerName}] No configuration profile found for: ${profileName} ` +
          `and no fallback STANDARD profile is registered`,
        );
      }
      return fallback;
    }
    return profile;
  }
}
