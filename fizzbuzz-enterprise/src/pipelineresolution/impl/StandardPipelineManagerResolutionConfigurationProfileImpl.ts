import { AbstractBasePipelineManagerResolutionConfigurationProfile } from "../abstracts/AbstractBasePipelineManagerResolutionConfigurationProfile.js";

export const ResolutionConfigurationProfileType = {
  STANDARD: "STANDARD",
  ENTERPRISE_SERVICE_LOCATOR: "ENTERPRISE_SERVICE_LOCATOR",
  HIGH_AVAILABILITY: "HIGH_AVAILABILITY",
} as const;

export type ResolutionConfigurationProfileType =
  (typeof ResolutionConfigurationProfileType)[keyof typeof ResolutionConfigurationProfileType];

export class StandardPipelineManagerResolutionConfigurationProfileImpl
  extends AbstractBasePipelineManagerResolutionConfigurationProfile
{
  protected readonly profileName: string;
  protected readonly profileVersion: string;
  protected readonly defaultStrategyName: string;
  protected readonly serviceLocatorLookupEnabled: boolean;
  protected readonly resolutionTimeoutMs: number;
  protected readonly maxResolutionAttempts: number;

  constructor(
    profileType: ResolutionConfigurationProfileType = "STANDARD",
  ) {
    super();
    this.profileName = `PipelineManagerResolutionConfigurationProfile[${profileType}]`;
    this.profileVersion = `1.0.0-CONFIG-${profileType}`;
    this.defaultStrategyName = profileType === "ENTERPRISE_SERVICE_LOCATOR" ? "SERVICE_LOCATOR" : "DIRECT";
    this.serviceLocatorLookupEnabled = profileType === "ENTERPRISE_SERVICE_LOCATOR";
    this.resolutionTimeoutMs = profileType === "HIGH_AVAILABILITY" ? 5000 : 1000;
    this.maxResolutionAttempts = profileType === "HIGH_AVAILABILITY" ? 3 : 1;
  }
}
