import type { IFizzBuzzPipelineConfigurationProfile } from "../contracts/IFizzBuzzPipelineConfigurationProfile.js";

export abstract class AbstractBaseFizzBuzzPipelineConfigurationProfile implements IFizzBuzzPipelineConfigurationProfile {
  abstract getProfileName(): string;
  abstract getProfileVersion(): string;
  abstract isValidationEnabled(): boolean;
  abstract isAuditTrailEnabled(): boolean;
  abstract isGovernanceEnforcementEnabled(): boolean;
  abstract getSlaThresholdMs(): number;
}
