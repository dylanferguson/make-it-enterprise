import { AbstractBaseEnterpriseComputedOutcomePreEvaluationCommandRegistry } from "../../abstracts/AbstractBaseEnterpriseComputedOutcomePreEvaluationCommandRegistry.js";

export class DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistryImpl
  extends AbstractBaseEnterpriseComputedOutcomePreEvaluationCommandRegistry
{
  private static readonly REGISTRY_NAME = "DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistry";
  private static readonly REGISTRY_VERSION = "1.0.0-PRE-EVAL-COMMAND-REGISTRY";
  private static initialized = false;

  constructor() {
    super(
      DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistryImpl.REGISTRY_NAME,
      DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistryImpl.REGISTRY_VERSION,
    );
    if (!DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistryImpl.initialized) {
      DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistryImpl.initialized = true;
    }
  }

  override getRegistryName(): string {
    return DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistryImpl.REGISTRY_NAME;
  }

  override getRegistryVersion(): string {
    return DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistryImpl.REGISTRY_VERSION;
  }

  static isInitialized(): boolean {
    return DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistryImpl.initialized;
  }

  static resetInitialization(): void {
    DefaultEnterpriseComputedOutcomePreEvaluationCommandRegistryImpl.initialized = false;
  }
}
