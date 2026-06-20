import { AbstractBaseFizzBuzzPipelineConfigurationProfile } from "../abstracts/AbstractBaseFizzBuzzPipelineConfigurationProfile.js";

export class StandardFizzBuzzPipelineConfigurationProfileImpl
  extends AbstractBaseFizzBuzzPipelineConfigurationProfile
{
  protected readonly profileName = "StandardFizzBuzzPipelineConfigurationProfile";
  protected readonly profileVersion = "1.0.0-PIPELINE-CONFIG-PROFILE";
  private readonly validationEnabled: boolean;
  private readonly auditTrailEnabled: boolean;
  private readonly governanceEnforcementEnabled: boolean;
  private readonly slaThresholdMs: number;

  constructor(
    validationEnabled: boolean = true,
    auditTrailEnabled: boolean = true,
    governanceEnforcementEnabled: boolean = true,
    slaThresholdMs: number = 50,
  ) {
    super();
    this.validationEnabled = validationEnabled;
    this.auditTrailEnabled = auditTrailEnabled;
    this.governanceEnforcementEnabled = governanceEnforcementEnabled;
    this.slaThresholdMs = slaThresholdMs;
  }

  override getProfileName(): string {
    return this.profileName;
  }

  override getProfileVersion(): string {
    return this.profileVersion;
  }

  override isValidationEnabled(): boolean {
    return this.validationEnabled;
  }

  override isAuditTrailEnabled(): boolean {
    return this.auditTrailEnabled;
  }

  override isGovernanceEnforcementEnabled(): boolean {
    return this.governanceEnforcementEnabled;
  }

  override getSlaThresholdMs(): number {
    return this.slaThresholdMs;
  }
}
