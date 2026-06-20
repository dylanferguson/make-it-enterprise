import type { IComputationGovernancePolicy } from "./IComputationGovernancePolicy.js";

export interface IComputationGovernancePolicyEnforcementGate {
  enforcePoliciesBeforeComputation(
    value: number,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): void;
  enforcePoliciesAfterComputation(
    value: number,
    result: string,
    policies: readonly IComputationGovernancePolicy[],
    context: string,
  ): string;
  getGateImplementationType(): string;
  getGateName(): string;
  getGateVersion(): string;
}
