import { AbstractBaseComputationGovernancePolicyEnforcementGate } from "../../abstracts/AbstractBaseComputationGovernancePolicyEnforcementGate.js";
import type { IComputationGovernancePolicy } from "../../contracts/IComputationGovernancePolicy.js";

export class DefaultComputationGovernancePolicyEnforcementGateImpl extends AbstractBaseComputationGovernancePolicyEnforcementGate {
  private static readonly GATE_NAME = "DefaultComputationGovernancePolicyEnforcementGate";
  private static readonly GATE_VERSION = "1.0.0-GOVERNANCE-GATE";
  private static readonly GATE_IMPLEMENTATION_TYPE = "STANDARD_STRICT";

  constructor() {
    super(
      DefaultComputationGovernancePolicyEnforcementGateImpl.GATE_NAME,
      DefaultComputationGovernancePolicyEnforcementGateImpl.GATE_VERSION,
      DefaultComputationGovernancePolicyEnforcementGateImpl.GATE_IMPLEMENTATION_TYPE,
    );
  }

  override enforcePoliciesBeforeComputation(
    value: number,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): void {
    for (const policy of policies) {
      if (!policy.isPolicyEnabled()) {
        continue;
      }
      if (!policy.validateComputationValue(value)) {
        this.throwPolicyViolation(
          `Pre-computation policy validation failed for value ${value}`,
          policy.getPolicyName(),
          value,
          context,
        );
      }
    }
  }

  override enforcePoliciesAfterComputation(
    value: number,
    result: string,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): string {
    for (const policy of policies) {
      if (!policy.isPolicyEnabled()) {
        continue;
      }
      if (!policy.validateComputationResult(value, result)) {
        this.throwPolicyViolation(
          `Post-computation policy validation failed: result="${result}" for value ${value}`,
          policy.getPolicyName(),
          value,
          context,
        );
      }
    }
    return result;
  }
}
