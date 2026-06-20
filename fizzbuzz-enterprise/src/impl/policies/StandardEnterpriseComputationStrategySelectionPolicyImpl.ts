import { AbstractBaseEnterpriseComputationStrategySelectionPolicy } from "../../abstracts/AbstractBaseEnterpriseComputationStrategySelectionPolicy.js";
import type { IEnterpriseComputationStrategySelectionContext } from "../../contracts/IEnterpriseComputationStrategySelectionContext.js";

export class StandardEnterpriseComputationStrategySelectionPolicyImpl
  extends AbstractBaseEnterpriseComputationStrategySelectionPolicy
{
  private static readonly POLICY_NAME = "StandardEnterpriseComputationStrategySelectionPolicy";
  private static readonly POLICY_VERSION = "1.0.0-STANDARD-POLICY";

  constructor() {
    super(0);
  }

  getPolicyName(): string {
    return StandardEnterpriseComputationStrategySelectionPolicyImpl.POLICY_NAME;
  }

  getPolicyVersion(): string {
    return StandardEnterpriseComputationStrategySelectionPolicyImpl.POLICY_VERSION;
  }

  evaluatePolicy(context: IEnterpriseComputationStrategySelectionContext): boolean {
    return context.getSelectionProfile() === "STANDARD" || context.getSelectionProfile() === "";
  }
}
