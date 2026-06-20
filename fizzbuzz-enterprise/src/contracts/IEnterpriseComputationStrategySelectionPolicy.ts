import type { IEnterpriseComputationStrategySelectionContext } from "./IEnterpriseComputationStrategySelectionContext.js";

export interface IEnterpriseComputationStrategySelectionPolicy {
  evaluatePolicy(context: IEnterpriseComputationStrategySelectionContext): boolean;
  getPolicyName(): string;
  getPolicyVersion(): string;
  getPolicyPriority(): number;
}
