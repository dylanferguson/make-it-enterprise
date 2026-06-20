import type { IDivisibilityModuloEvaluationChainHandler } from "./IDivisibilityModuloEvaluationChainHandler.js";

export interface IDivisibilityModuloEvaluationFactoryBean {
  getFactoryBeanName(): string;
  getFactoryBeanVersion(): string;
  createChainHandler(): IDivisibilityModuloEvaluationChainHandler;
  isSingleton(): boolean;
  getSupportedDivisor(): number;
}
