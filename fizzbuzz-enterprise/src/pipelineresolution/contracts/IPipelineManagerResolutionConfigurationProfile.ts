export interface IPipelineManagerResolutionConfigurationProfile {
  getProfileName(): string;
  getProfileVersion(): string;
  getDefaultStrategyName(): string;
  isServiceLocatorLookupEnabled(): boolean;
  getResolutionTimeoutMs(): number;
  getMaxResolutionAttempts(): number;
}
