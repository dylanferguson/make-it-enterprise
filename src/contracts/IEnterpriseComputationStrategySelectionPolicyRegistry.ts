import type { IEnterpriseComputationStrategySelectionPolicy } from "./IEnterpriseComputationStrategySelectionPolicy.js";

export interface IEnterpriseComputationStrategySelectionPolicyRegistry {
  registerPolicy(policy: IEnterpriseComputationStrategySelectionPolicy): void;
  unregisterPolicy(policyName: string): boolean;
  getPolicy(policyName: string): IEnterpriseComputationStrategySelectionPolicy | null;
  getAllPolicies(): readonly IEnterpriseComputationStrategySelectionPolicy[];
  getApplicablePolicies(value: number): readonly IEnterpriseComputationStrategySelectionPolicy[];
  getRegistryName(): string;
  getRegistryVersion(): string;
}
