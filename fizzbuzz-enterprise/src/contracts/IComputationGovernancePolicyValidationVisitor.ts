import type { IComputationGovernancePolicy } from "./IComputationGovernancePolicy.js";
import type { IComputationGovernancePolicyRegistry } from "./IComputationGovernancePolicyRegistry.js";

export interface IComputationGovernancePolicyValidationVisitor {
  visitPolicyRegistry(registry: IComputationGovernancePolicyRegistry): void;
  visitPolicy(policy: IComputationGovernancePolicy): void;
  visitComputationValue(value: number, policy: IComputationGovernancePolicy): boolean;
  visitComputationResult(value: number, result: string, policy: IComputationGovernancePolicy): boolean;
  getVisitorName(): string;
  getVisitorVersion(): string;
  getValidationAuditTrail(): readonly string[];
  clearAuditTrail(): void;
}
