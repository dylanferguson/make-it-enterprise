export interface IFizzBuzzPipelineConfigurationProfile {
  getProfileName(): string;
  getProfileVersion(): string;
  isValidationEnabled(): boolean;
  isAuditTrailEnabled(): boolean;
  isGovernanceEnforcementEnabled(): boolean;
  getSlaThresholdMs(): number;
}
