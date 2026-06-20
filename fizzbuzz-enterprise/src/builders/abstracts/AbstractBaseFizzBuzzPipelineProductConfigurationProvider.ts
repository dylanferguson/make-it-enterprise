import type { IFizzBuzzPipelineProductConfigurationProvider, IFizzBuzzPipelineProductConfigurationProfile } from "../contracts/IFizzBuzzPipelineProductConfigurationProvider.js";

export abstract class AbstractBaseFizzBuzzPipelineProductConfigurationProvider
  implements IFizzBuzzPipelineProductConfigurationProvider
{
  protected abstract readonly providerName: string;
  protected abstract readonly providerVersion: string;
  protected readonly registeredProfiles: Map<string, IFizzBuzzPipelineProductConfigurationProfile> = new Map();
  protected activeProfileName: string = "STANDARD";

  getConfigurationProviderName(): string {
    return this.providerName;
  }

  getConfigurationProviderVersion(): string {
    return this.providerVersion;
  }

  abstract resolveConfigurationProfile(profileName: string): IFizzBuzzPipelineProductConfigurationProfile;

  getRegisteredProfileNames(): readonly string[] {
    return Array.from(this.registeredProfiles.keys());
  }

  getActiveProfileName(): string {
    return this.activeProfileName;
  }

  setActiveProfileName(profileName: string): void {
    if (!this.registeredProfiles.has(profileName)) {
      throw new Error(
        `[${this.providerName}] Cannot set active profile to unknown profile: ${profileName}. ` +
        `Registered profiles: ${this.getRegisteredProfileNames().join(", ")}`,
      );
    }
    this.activeProfileName = profileName;
  }

  protected registerProfile(profile: IFizzBuzzPipelineProductConfigurationProfile): void {
    this.registeredProfiles.set(profile.getProfileName(), profile);
  }
}
