import type { IComputationGovernancePolicyRegistry } from "../contracts/IComputationGovernancePolicyRegistry.js";
import type { IComputationGovernancePolicy } from "../contracts/IComputationGovernancePolicy.js";

export abstract class AbstractBaseComputationGovernancePolicyRegistry
  implements IComputationGovernancePolicyRegistry
{
  protected readonly registryName: string;
  protected readonly registryVersion: string;
  protected readonly policies: IComputationGovernancePolicy[] = [];

  constructor(registryName: string, registryVersion: string) {
    this.registryName = registryName;
    this.registryVersion = registryVersion;
  }

  abstract registerPolicy(policy: IComputationGovernancePolicy): void;
  abstract unregisterPolicy(policyName: string): boolean;

  getPolicy(policyName: string): IComputationGovernancePolicy | null {
    return this.policies.find(p => p.getPolicyName() === policyName) ?? null;
  }

  getPoliciesForComputationType(computationType: string): readonly IComputationGovernancePolicy[] {
    return this.policies.filter(
      p => p.getComputationType() === computationType && p.isPolicyEnabled(),
    );
  }

  getAllPolicies(): readonly IComputationGovernancePolicy[] {
    return [...this.policies];
  }

  getRegistryName(): string {
    return this.registryName;
  }

  getRegistryVersion(): string {
    return this.registryVersion;
  }

  clear(): void {
    this.policies.length = 0;
  }
}
