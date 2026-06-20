export interface IFizzBuzzPipelineProductConfigurationProfile {
  getProfileName(): string;
  getProfileVersion(): string;
  getSlaThresholdMs(): number;
  isCacheEnabled(): boolean;
  getDecoratorChainProfile(): string;
  getDiagnosticSummary(): Record<string, string>;
}

export interface IFizzBuzzPipelineProductConfigurationProvider {
  getConfigurationProviderName(): string;
  getConfigurationProviderVersion(): string;
  resolveConfigurationProfile(profileName: string): IFizzBuzzPipelineProductConfigurationProfile;
  getRegisteredProfileNames(): readonly string[];
  getActiveProfileName(): string;
}
