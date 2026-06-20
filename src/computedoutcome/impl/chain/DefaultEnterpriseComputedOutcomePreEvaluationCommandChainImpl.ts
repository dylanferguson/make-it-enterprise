import { AbstractBaseEnterpriseComputedOutcomePreEvaluationCommandChain } from "../../abstracts/AbstractBaseEnterpriseComputedOutcomePreEvaluationCommandChain.js";

export class DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl
  extends AbstractBaseEnterpriseComputedOutcomePreEvaluationCommandChain
{
  private static readonly CHAIN_NAME = "DefaultEnterpriseComputedOutcomePreEvaluationCommandChain";
  private static readonly CHAIN_VERSION = "1.0.0-PRE-EVAL-COMMAND-CHAIN";
  private static initialized = false;

  constructor() {
    super(
      DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl.CHAIN_NAME,
      DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl.CHAIN_VERSION,
    );
    if (!DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl.initialized) {
      DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl.initialized = true;
    }
  }

  override getChainName(): string {
    return DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl.CHAIN_NAME;
  }

  override getChainVersion(): string {
    return DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl.CHAIN_VERSION;
  }

  override evaluate(value: number): string | null {
    this.ensureSorted();
    for (const command of this.commands) {
      const result = command.evaluate(value);
      if (result !== null) {
        return result;
      }
    }
    return null;
  }

  static isInitialized(): boolean {
    return DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl.initialized;
  }

  static resetInitialization(): void {
    DefaultEnterpriseComputedOutcomePreEvaluationCommandChainImpl.initialized = false;
  }
}
