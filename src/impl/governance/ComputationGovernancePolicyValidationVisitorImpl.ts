import { AbstractBaseComputationGovernancePolicyValidationVisitor } from "../../abstracts/AbstractBaseComputationGovernancePolicyValidationVisitor.js";
import type { IComputationGovernancePolicy } from "../../contracts/IComputationGovernancePolicy.js";
import type { IComputationGovernancePolicyRegistry } from "../../contracts/IComputationGovernancePolicyRegistry.js";

export class ComputationGovernancePolicyValidationVisitorImpl extends AbstractBaseComputationGovernancePolicyValidationVisitor {
  private static readonly VISITOR_NAME = "ComputationGovernancePolicyValidationVisitor";
  private static readonly VISITOR_VERSION = "1.0.0-GOVERNANCE-VISITOR";
  private policiesVisitedCount: number = 0;
  private valuesValidatedCount: number = 0;
  private resultsValidatedCount: number = 0;
  private validationFailuresCount: number = 0;

  constructor() {
    super(
      ComputationGovernancePolicyValidationVisitorImpl.VISITOR_NAME,
      ComputationGovernancePolicyValidationVisitorImpl.VISITOR_VERSION,
    );
  }

  override visitPolicyRegistry(registry: IComputationGovernancePolicyRegistry): void {
    this.appendAuditEntry(
      `Visiting policy registry: ${registry.getRegistryName()} v${registry.getRegistryVersion()} ` +
      `(${registry.getAllPolicies().length} policies registered)`,
    );
    for (const policy of registry.getAllPolicies()) {
      this.visitPolicy(policy);
    }
  }

  override visitPolicy(policy: IComputationGovernancePolicy): void {
    this.policiesVisitedCount++;
    this.appendAuditEntry(
      `Visiting policy: ${policy.getPolicyName()} v${policy.getPolicyVersion()} ` +
      `(type=${policy.getComputationType()}, enabled=${policy.isPolicyEnabled()}, ` +
      `priority=${policy.getPolicyPriority()})`,
    );
  }

  override visitComputationValue(value: number, policy: IComputationGovernancePolicy): boolean {
    this.valuesValidatedCount++;
    const valid = policy.validateComputationValue(value);
    if (!valid) {
      this.validationFailuresCount++;
      this.appendAuditEntry(
        `Value validation FAILED: value=${value}, policy=${policy.getPolicyName()}`,
      );
    } else {
      this.appendAuditEntry(
        `Value validation PASSED: value=${value}, policy=${policy.getPolicyName()}`,
      );
    }
    return valid;
  }

  override visitComputationResult(value: number, result: string, policy: IComputationGovernancePolicy): boolean {
    this.resultsValidatedCount++;
    const valid = policy.validateComputationResult(value, result);
    if (!valid) {
      this.validationFailuresCount++;
      this.appendAuditEntry(
        `Result validation FAILED: value=${value}, result="${result}", policy=${policy.getPolicyName()}`,
      );
    } else {
      this.appendAuditEntry(
        `Result validation PASSED: value=${value}, result="${result}", policy=${policy.getPolicyName()}`,
      );
    }
    return valid;
  }

  getPoliciesVisitedCount(): number {
    return this.policiesVisitedCount;
  }

  getValuesValidatedCount(): number {
    return this.valuesValidatedCount;
  }

  getResultsValidatedCount(): number {
    return this.resultsValidatedCount;
  }

  getValidationFailuresCount(): number {
    return this.validationFailuresCount;
  }
}
