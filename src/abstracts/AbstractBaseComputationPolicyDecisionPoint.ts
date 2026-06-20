import type { IComputationPolicyDecisionPoint } from "../contracts/IComputationPolicyDecisionPoint.js";
import type { IComputationPolicy } from "../contracts/IComputationPolicy.js";
import type { IComputationPolicyDecision } from "../contracts/IComputationPolicyDecision.js";

export abstract class AbstractBaseComputationPolicyDecisionPoint
  implements IComputationPolicyDecisionPoint
{
  protected readonly policies: IComputationPolicy[] = [];
  protected active: boolean = true;

  abstract evaluate(value: number): IComputationPolicyDecision;
  abstract getDecisionPointName(): string;
  abstract getDecisionPointVersion(): string;

  registerPolicy(policy: IComputationPolicy): void {
    const insertIndex = this.policies.findIndex(
      (p) => p.getPolicyPriority() > policy.getPolicyPriority(),
    );
    if (insertIndex === -1) {
      this.policies.push(policy);
    } else {
      this.policies.splice(insertIndex, 0, policy);
    }
    console.debug(
      `[${this.getDecisionPointName()}] Registered policy [${policy.getPolicyName()}] at priority [${policy.getPolicyPriority()}]`,
    );
  }

  unregisterPolicy(policyName: string): boolean {
    const index = this.policies.findIndex((p) => p.getPolicyName() === policyName);
    if (index === -1) {
      return false;
    }
    this.policies.splice(index, 1);
    return true;
  }

  getRegisteredPolicies(): readonly IComputationPolicy[] {
    return [...this.policies];
  }

  isDecisionPointActive(): boolean {
    return this.active;
  }

  setDecisionPointActive(active: boolean): void {
    this.active = active;
  }

  protected evaluatePolicies(value: number): { allowed: boolean; violatingPolicies: IComputationPolicy[] } {
    const violatingPolicies: IComputationPolicy[] = [];
    for (const policy of this.policies) {
      if (!policy.evaluate(value)) {
        policy.onPolicyViolation(value);
        violatingPolicies.push(policy);
      }
    }
    return {
      allowed: violatingPolicies.length === 0,
      violatingPolicies,
    };
  }
}
