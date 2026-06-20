import type { IDivisibilityStrategyChainOfResponsibilityHandler } from "./IDivisibilityStrategyChainOfResponsibilityHandler.js";
import type { IDivisibilityStrategyEvaluator } from "./IDivisibilityStrategyEvaluator.js";

export interface IModuloEvaluationStrategyFactoryBean {
  createChainHandler(): IDivisibilityStrategyChainOfResponsibilityHandler;
  getDivisor(): number;
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
  isEvaluationCachingEnabled(): boolean;
}
