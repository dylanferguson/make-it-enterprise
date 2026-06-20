import { AbstractBaseComputationGovernancePolicyRegistry } from "../../abstracts/AbstractBaseComputationGovernancePolicyRegistry.js";
import type { IComputationGovernancePolicy } from "../../contracts/IComputationGovernancePolicy.js";

export class DefaultComputationGovernancePolicyRegistryImpl extends AbstractBaseComputationGovernancePolicyRegistry {
  private static readonly REGISTRY_NAME = "DefaultComputationGovernancePolicyRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-GOVERNANCE-REGISTRY";

  constructor() {
    super(
      DefaultComputationGovernancePolicyRegistryImpl.REGISTRY_NAME,
      DefaultComputationGovernancePolicyRegistryImpl.REGISTRY_VERSION,
    );
  }

  override registerPolicy(policy: IComputationGovernancePolicy): void {
    const existing = this.getPolicy(policy.getPolicyName());
    if (existing !== null) {
      const index = this.policies.indexOf(existing);
      this.policies[index] = policy;
    } else {
      this.policies.push(policy);
    }
    console.debug(
      `[${this.getRegistryName()}] Policy registered: ${policy.getPolicyName()} v${policy.getPolicyVersion()} ` +
      `(type=${policy.getComputationType()}, priority=${policy.getPolicyPriority()})`,
    );
  }

  override unregisterPolicy(policyName: string): boolean {
    const index = this.policies.findIndex(p => p.getPolicyName() === policyName);
    if (index !== -1) {
      this.policies.splice(index, 1);
      console.debug(
        `[${this.getRegistryName()}] Policy unregistered: ${policyName}`,
      );
      return true;
    }
    return false;
  }
}
