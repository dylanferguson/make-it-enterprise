import type { IDivisibilityEvaluationStrategyChainSelector } from "../contracts/IDivisibilityEvaluationStrategyChainSelector.js";
import type { IDivisibilityEvaluationStrategyChain } from "../contracts/IDivisibilityEvaluationStrategyChain.js";

export abstract class AbstractBaseDivisibilityEvaluationStrategyChainSelector
  implements IDivisibilityEvaluationStrategyChainSelector
{
  protected static readonly DEFAULT_SELECTOR_NAME = "AbstractBaseDivisibilityEvaluationStrategyChainSelector";

  private readonly selectorName: string;
  protected readonly chainRegistry: Map<string, IDivisibilityEvaluationStrategyChain> = new Map();
  protected defaultChain: IDivisibilityEvaluationStrategyChain | null = null;

  constructor(selectorName: string = AbstractBaseDivisibilityEvaluationStrategyChainSelector.DEFAULT_SELECTOR_NAME) {
    this.selectorName = selectorName;
  }

  abstract selectChain(
    selectorKey: string,
    context?: Record<string, unknown>,
  ): IDivisibilityEvaluationStrategyChain;

  registerChain(key: string, chain: IDivisibilityEvaluationStrategyChain): void {
    this.chainRegistry.set(key, chain);
    console.debug(
      `[${this.selectorName}] Registered chain '${key}' (${chain.getChainName()} v${chain.getChainVersion()})`,
    );
  }

  unregisterChain(key: string): boolean {
    return this.chainRegistry.delete(key);
  }

  getDefaultChain(): IDivisibilityEvaluationStrategyChain {
    if (this.defaultChain !== null) {
      return this.defaultChain;
    }
    if (this.chainRegistry.size > 0) {
      return this.chainRegistry.values().next().value!;
    }
    throw new Error(
      `[${this.selectorName}] No default chain available and registry is empty`,
    );
  }

  setDefaultChain(chain: IDivisibilityEvaluationStrategyChain): void {
    this.defaultChain = chain;
  }

  getSelectorName(): string {
    return this.selectorName;
  }

  getRegisteredChainCount(): number {
    return this.chainRegistry.size;
  }

  protected resolveFromRegistry(
    key: string,
    _context?: Record<string, unknown>,
  ): IDivisibilityEvaluationStrategyChain | null {
    return this.chainRegistry.get(key) ?? null;
  }
}
