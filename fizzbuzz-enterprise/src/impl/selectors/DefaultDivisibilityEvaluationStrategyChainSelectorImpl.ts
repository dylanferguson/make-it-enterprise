import { AbstractBaseDivisibilityEvaluationStrategyChainSelector } from "../../abstracts/AbstractBaseDivisibilityEvaluationStrategyChainSelector.js";
import type { IDivisibilityEvaluationStrategyChain } from "../../contracts/IDivisibilityEvaluationStrategyChain.js";

export class DefaultDivisibilityEvaluationStrategyChainSelectorImpl extends AbstractBaseDivisibilityEvaluationStrategyChainSelector {
  private static readonly SELECTOR_NAME = "DefaultDivisibilityEvaluationStrategyChainSelector";

  constructor() {
    super(DefaultDivisibilityEvaluationStrategyChainSelectorImpl.SELECTOR_NAME);
  }

  override selectChain(
    selectorKey: string,
    context?: Record<string, unknown>,
  ): IDivisibilityEvaluationStrategyChain {
    const resolved = this.resolveFromRegistry(selectorKey, context);
    if (resolved !== null) {
      return resolved;
    }
    const environmentHint = context?.["ENVIRONMENT"] as string | undefined;
    if (environmentHint !== undefined) {
      const envResolved = this.resolveFromRegistry(`env:${environmentHint}`, context);
      if (envResolved !== null) {
        return envResolved;
      }
    }
    console.debug(
      `[${this.getSelectorName()}] Chain not found for key '${selectorKey}', returning default`,
    );
    return this.getDefaultChain();
  }
}
