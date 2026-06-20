import type { IEnterpriseComputationStrategySelectionPolicy } from "../contracts/IEnterpriseComputationStrategySelectionPolicy.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../contracts/IEnterpriseComputationStrategySelectionContext.js";

export abstract class AbstractBaseEnterpriseComputationStrategySelectionPolicy
  implements IEnterpriseComputationStrategySelectionPolicy
{
  protected readonly policyPriority: number;
  protected static readonly POLICY_FRAMEWORK_VERSION = "1.0.0-POLICY-FRAMEWORK";

  constructor(policyPriority: number = 0) {
    this.policyPriority = policyPriority;
  }

  abstract getPolicyName(): string;
  abstract getPolicyVersion(): string;
  abstract evaluatePolicy(context: IEnterpriseComputationStrategySelectionContext): boolean;

  getPolicyPriority(): number {
    return this.policyPriority;
  }

  protected getPolicyFrameworkVersion(): string {
    return AbstractBaseEnterpriseComputationStrategySelectionPolicy.POLICY_FRAMEWORK_VERSION;
  }
}
