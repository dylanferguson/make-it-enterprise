import { AbstractBaseEnterpriseComputationStrategySelectionPolicyRegistry } from "../../abstracts/AbstractBaseEnterpriseComputationStrategySelectionPolicyRegistry.js";

export class EnterpriseComputationStrategySelectionPolicyRegistryImpl
  extends AbstractBaseEnterpriseComputationStrategySelectionPolicyRegistry
{
  private static readonly REGISTRY_NAME = "EnterpriseComputationStrategySelectionPolicyRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-POLICY-REGISTRY";

  getRegistryName(): string {
    return EnterpriseComputationStrategySelectionPolicyRegistryImpl.REGISTRY_NAME;
  }

  getRegistryVersion(): string {
    return EnterpriseComputationStrategySelectionPolicyRegistryImpl.REGISTRY_VERSION;
  }
}
