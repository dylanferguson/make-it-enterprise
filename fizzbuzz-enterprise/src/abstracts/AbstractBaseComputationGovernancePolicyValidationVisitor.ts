import type { IComputationGovernancePolicyValidationVisitor } from "../contracts/IComputationGovernancePolicyValidationVisitor.js";
import type { IComputationGovernancePolicy } from "../contracts/IComputationGovernancePolicy.js";
import type { IComputationGovernancePolicyRegistry } from "../contracts/IComputationGovernancePolicyRegistry.js";

export abstract class AbstractBaseComputationGovernancePolicyValidationVisitor
  implements IComputationGovernancePolicyValidationVisitor
{
  protected readonly visitorName: string;
  protected readonly visitorVersion: string;
  protected readonly auditTrail: string[] = [];

  constructor(visitorName: string, visitorVersion: string) {
    this.visitorName = visitorName;
    this.visitorVersion = visitorVersion;
  }

  abstract visitPolicyRegistry(registry: IComputationGovernancePolicyRegistry): void;
  abstract visitPolicy(policy: IComputationGovernancePolicy): void;
  abstract visitComputationValue(value: number, policy: IComputationGovernancePolicy): boolean;
  abstract visitComputationResult(value: number, result: string, policy: IComputationGovernancePolicy): boolean;

  getVisitorName(): string {
    return this.visitorName;
  }

  getVisitorVersion(): string {
    return this.visitorVersion;
  }

  getValidationAuditTrail(): readonly string[] {
    return [...this.auditTrail];
  }

  clearAuditTrail(): void {
    this.auditTrail.length = 0;
  }

  protected appendAuditEntry(entry: string): void {
    this.auditTrail.push(`[${this.visitorName}] ${entry}`);
  }
}
