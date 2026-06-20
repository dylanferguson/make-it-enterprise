import type { IComputationGovernancePolicy } from "./IComputationGovernancePolicy.js";

export interface IComputationGovernancePolicyRegistry {
  registerPolicy(policy: IComputationGovernancePolicy): void;
  unregisterPolicy(policyName: string): boolean;
  getPolicy(policyName: string): IComputationGovernancePolicy | null;
  getPoliciesForComputationType(computationType: string): readonly IComputationGovernancePolicy[];
  getAllPolicies(): readonly IComputationGovernancePolicy[];
  getRegistryName(): string;
  getRegistryVersion(): string;
  clear(): void;
}
