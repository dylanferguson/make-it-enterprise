import type { IEnterpriseComputationStrategySelectionPolicyRegistry } from "../contracts/IEnterpriseComputationStrategySelectionPolicyRegistry.js";
import type { IEnterpriseComputationStrategySelectionPolicy } from "../contracts/IEnterpriseComputationStrategySelectionPolicy.js";

export abstract class AbstractBaseEnterpriseComputationStrategySelectionPolicyRegistry
  implements IEnterpriseComputationStrategySelectionPolicyRegistry
{
  protected readonly policies: Map<string, IEnterpriseComputationStrategySelectionPolicy> = new Map();

  abstract getRegistryName(): string;
  abstract getRegistryVersion(): string;

  registerPolicy(policy: IEnterpriseComputationStrategySelectionPolicy): void {
    this.policies.set(policy.getPolicyName(), policy);
  }

  unregisterPolicy(policyName: string): boolean {
    return this.policies.delete(policyName);
  }

  getPolicy(policyName: string): IEnterpriseComputationStrategySelectionPolicy | null {
    return this.policies.get(policyName) ?? null;
  }

  getAllPolicies(): readonly IEnterpriseComputationStrategySelectionPolicy[] {
    return Array.from(this.policies.values());
  }

  getApplicablePolicies(value: number): readonly IEnterpriseComputationStrategySelectionPolicy[] {
    return Array.from(this.policies.values()).sort(
      (a, b) => b.getPolicyPriority() - a.getPolicyPriority(),
    );
  }
}
