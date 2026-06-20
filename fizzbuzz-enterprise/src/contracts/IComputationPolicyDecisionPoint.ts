import type { IComputationPolicy } from "./IComputationPolicy.js";
import type { IComputationPolicyDecision } from "./IComputationPolicyDecision.js";

export interface IComputationPolicyDecisionPoint {
  evaluate(value: number): IComputationPolicyDecision;
  registerPolicy(policy: IComputationPolicy): void;
  unregisterPolicy(policyName: string): boolean;
  getRegisteredPolicies(): readonly IComputationPolicy[];
  getDecisionPointName(): string;
  getDecisionPointVersion(): string;
  isDecisionPointActive(): boolean;
  setDecisionPointActive(active: boolean): void;
}
