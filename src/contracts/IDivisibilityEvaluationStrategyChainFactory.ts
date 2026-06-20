import type { IDivisibilityEvaluationStrategyChain } from "./IDivisibilityEvaluationStrategyChain.js";

export interface IDivisibilityEvaluationStrategyChainFactory {
  createChain(): IDivisibilityEvaluationStrategyChain;
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
  isSingleton(): boolean;
  destroyChain(): void;
}
