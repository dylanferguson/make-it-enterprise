import type { IDivisibilityEvaluationStrategyChain } from "./IDivisibilityEvaluationStrategyChain.js";

export interface IDivisibilityEvaluationStrategyChainSelector {
  selectChain(selectorKey: string, context?: Record<string, unknown>): IDivisibilityEvaluationStrategyChain;
  registerChain(key: string, chain: IDivisibilityEvaluationStrategyChain): void;
  unregisterChain(key: string): boolean;
  getDefaultChain(): IDivisibilityEvaluationStrategyChain;
  getSelectorName(): string;
  getRegisteredChainCount(): number;
}
